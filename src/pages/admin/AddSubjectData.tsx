import {useEffect, useState} from 'react';
import * as XLSX from 'xlsx';
import AdminNavigation from '../../components/AdminNavigation.tsx';
import '@styles/AddSubjectPage.scss';

interface IHeaderTitles {
  [key: string]: string;
}

const DefaultHeader = {
  courseId: '학수번호',
  classId: '분반',
  courseTitle: '교과목명',
  classCredit: '학점',
  theoryCredit: '이론',
  practiceCredit: '실습',
  offeringDepartment: "주관학과",
  instructorName: '메인\n교수명',
  classTime: '요일 및 강의시간'
}

function AddSubjectData() {
  const [semester, setSemester] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);

  const [titles, setTitles] = useState<string[]>([]);
  const [header, setHeader] = useState<string[]>([]);
  const [sheet, setSheet] = useState<(string|undefined)[][]>([]);
  const [selectedTitle, setSelectedTitle] = useState<number>(-1);

  const [headerTitles, setHeaderTitles] = useState<IHeaderTitles>(DefaultHeader);

  useEffect(() => {
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        if (!e.target || !e.target.result) return;

        const data = e.target.result;

        const wb = XLSX.read(data, {type: 'binary'});
        const titles = wb.SheetNames;
        setTitles(titles);

        const parse = XLSX.utils.sheet_to_json(wb.Sheets[titles[0]], {header: 1}) as (string|undefined)[][];
        setSelectedTitle(0);

        // 제목 찾는 프로세싱
        const MAX_COL = parse.reduce((acc, cur) => Math.max(acc, cur.length), 0);
        const HEADER_ROW = parse.findIndex(row => row.length === MAX_COL);

        const rawSheet = parse.map(row =>
          Array.from({length: MAX_COL}, (_, index) => row[index] ?? ''));

        const header = rawSheet[HEADER_ROW];
        const sheet = rawSheet.slice(HEADER_ROW + 1);

        setHeader(header);
        setSheet(sheet);

        // 기본 선택 항목 찾기
        const defaultHeaderTitles = Object.keys(DefaultHeader);
        const headerTitles: IHeaderTitles = DefaultHeader;

        defaultHeaderTitles.forEach((key) => {
          headerTitles[key] = header.includes(headerTitles[key]) ? headerTitles[key] : '';
        });

        setHeaderTitles(headerTitles);
      };

      reader.readAsBinaryString(file);
    }
  }, [file]);

  function addSemester() {
    if (!semester) {
      alert('학기를 입력해주세요.');
      return;
    }

    if (!confirm('학기를 추가하시겠습니까?'))
      return;

    // Todo: 학기 추가 API 추가
  }

  function addSubject() {
    if (!confirm('과목을 추가하시겠습니까?'))
      return;

    // data로 변경
    const data = sheet.map(row => {
      return {
        courseId: Number(row[header.indexOf(headerTitles.courseId)]),
        classId: Number(row[header.indexOf(headerTitles.classId)]),
        courseTitle: row[header.indexOf(headerTitles.courseTitle)],
        credit: [
          row[header.indexOf(headerTitles.classCredit)],
          row[header.indexOf(headerTitles.theoryCredit)],
          row[header.indexOf(headerTitles.practiceCredit)],
        ].join('/'),
        offeringDepartment: row[header.indexOf(headerTitles.offeringDepartment)],
        instructorName: row[header.indexOf(headerTitles.instructorName)],
        classTime: row[header.indexOf(headerTitles.classTime)]
      }
    });

    // Todo: 과목 추가 API 추가
    console.log(data);
  }

  return (
    <>
      <AdminNavigation/>

      <div className='responsive'>
        <div className='admin_main'>
          <h1>데이터 추가</h1>

          <h2>과목 학기 추가</h2>
          <div className='flex_layout'>
            <input type='text' value={semester} onChange={e => setSemester(e.target.value)}/>
            <button onClick={addSemester}>추가</button>
          </div>

          <h2>과목 추가</h2>
          <div className='container_box'>

            <h3>과목 엑셀 파일</h3>
            <input type='file' multiple={false}
                   onChange={e => {
                     if (!e.target.files) return;

                     setFile(e.target.files[0]);
                   }}/>
            <br/> <br/>

            <div className='container_box'>
              <h3>시트 미리보기</h3>
              <div className='x_scroll_layout'>
                <table className='font_small'>
                  <thead>
                  <tr>
                    {header.map((title, index) => (
                      <th key={index}>{title}</th>
                    ))}
                  </tr>
                  </thead>
                  <tbody>
                  {sheet.slice(0, 10).map((row, index) => (
                    <tr key={index}>
                      {row.map((data, index) => (
                        <td key={index}>{data}</td>
                      ))}
                    </tr>
                  ))}
                  </tbody>
                </table>
              </div>

              <h3 className='blind'>시트 제목</h3>
              <div className='x_scroll_layout'>
                <ul className='sheet_name_layout'>
                  {titles.length ?
                    titles.map((title, index) => (
                      <li key={index}>
                        <button className={selectedTitle === index ? 'selected' : ''}>
                          {title}
                        </button>
                      </li>
                    ))
                    : (
                      <li>항목이 없습니다</li>
                    )}
                </ul>
              </div>
            </div>

            <br/>

            {sheet.length ? (
              <div className='container_box'>
                <h4>과목 제목 설정</h4>

                <ul>
                  {Object.keys(headerTitles).map((key, index) => (
                    <li key={index}>
                      <label>{key} : </label>
                      <select name={key}
                              id={key}
                              value={headerTitles[key] ?? ''}
                              onChange={e => setHeaderTitles(prev => ({
                                ...prev,
                                [key]: e.target.value
                              }))}>
                        {header.map((title, index) => (
                          <option key={index} value={title}>{title}</option>
                        ))}
                      </select>
                    </li>
                  ))}
                </ul>


                <h4>과목 학기 선택</h4>

                <select name='' id=''>
                  <option value=''>2024년도 1학기</option>
                  <option value=''>2024년도 여름학기</option>
                  <option value=''>2024년도 2학기</option>
                </select>

                <br/>
                <br/>

                <button onClick={addSubject}>과목 추가</button>

              </div>
            ) : (
              <p>파일을 선택해주세요.</p>
            )}
          </div>

        </div>
      </div>
    </>
  );
}

export default AddSubjectData;