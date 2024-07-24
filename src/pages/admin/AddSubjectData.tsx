import {useEffect, useState} from 'react';
import * as XLSX from 'xlsx';
import AdminNavigation from '../../components/AdminNavigation.tsx';

function AddSubjectData() {
  const [semester, setSemester] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);

  const [titles, setTitles] = useState<string[]>([]);
  const [header, setHeader] = useState<string[]>([]);
  const [sheet, setSheet] = useState<(string|undefined)[][]>([]);

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

        // 제목 찾는 프로세싱
        const MAX_COL = parse.reduce((acc, cur) => Math.max(acc, cur.length), 0);
        const HEADER_ROW = parse.findIndex(row => row.length === MAX_COL);

        const rawSheet = parse.map(row =>
          Array.from({length: MAX_COL}, (_, index) => row[index] ?? ''));

        const header = rawSheet[HEADER_ROW];
        const sheet = rawSheet.slice(HEADER_ROW + 1);

        setHeader(header);
        setSheet(sheet);
      };

      reader.readAsBinaryString(file);
    }
  }, [file]);

  return (
    <>
      <AdminNavigation/>

      <div className='responsive'>
        <div className='admin_main'>
          <h1>데이터 추가</h1>

          <h2>과목 학기</h2>
          <input type='text' value={semester} onChange={e => setSemester(e.target.value)}/>

          <h2>과목 엑셀 파일</h2>
          <input type='file' multiple={false}
                  onChange={e => {
                    if (!e.target.files) return;

                    setFile(e.target.files[0]);
                  }}/>

          <h3>파일 제목</h3>
          <p>{file ? file.name : '파일을 선택해주세요.'}</p>
          <h3>시트 제목</h3>
          <ul>
            {titles.length ?
              titles.map((title, index) => (
                <li key={index}>{title}</li>
              ))
            : (
              <li>항목이 없습니다</li>
            )}
          </ul>

          <table className='container_box'>
            <thead>
              <tr>
                {header.map((title, index) => (
                  <th key={index}>{title}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sheet.map((row, index) => (
                <tr key={index}>
                  {row.map((data, index) => (
                    <td key={index}>{data}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default AddSubjectData;