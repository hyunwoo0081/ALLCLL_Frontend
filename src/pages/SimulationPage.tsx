import PageDefaultLayout from '@layouts/PageDefaultLayout.tsx';
import MacroDialog from '@layouts/dialog/MacroDialog.tsx';
import SubjectApplyDialog from '@layouts/dialog/SubjectApplyDialog.tsx';
import ApplySuccessDialog from '@layouts/dialog/ApplySuccessDialog.tsx';
import ApplyFailDialog from '@layouts/dialog/ApplyFailDialog.tsx';
import ApplyDoneDialog from '@layouts/dialog/ApplyDoneDialog.tsx';
import FailedMacroDialog from '@layouts/dialog/FailedMacroDialog.tsx';
import FinishDialog from '@layouts/dialog/FinishDialog.tsx';
import ErrorDialog from '@layouts/dialog/ErrorDialog.tsx';
import useSimulation from '@hooks/useSimulation.ts';
import {ApplyDialogType, DataFormats} from '@constant/types.ts';
import '@styles/components/TableStyle.scss';

const StatusClass = ['', '', '', 'success', 'fail', 'done'];

function SimulationPage() {

  const simulation = useSimulation();
  const {onSimulation,
    loading, subjects, appliedSubjects, submitStatus,
    startSimulation, restartSimulation, refreshTable, startStep} = simulation;

  document.title = 'ALLCLL | 수강신청';

  return (
    <>
      <MacroDialog useSimulation={simulation}/>
      <SubjectApplyDialog useSimulation={simulation}/>
      <ApplySuccessDialog useSimulation={simulation}/>
      <ApplyFailDialog useSimulation={simulation}/>
      <ApplyDoneDialog useSimulation={simulation}/>
      <FailedMacroDialog useSimulation={simulation}/>
      <FinishDialog useSimulation={simulation}/>
      <ErrorDialog useSimulation={simulation}/>


      <PageDefaultLayout className=''>
        <div className='search_layout'>
          <div className='inputs_layout'>
            <select name='' id='' disabled>
              <option value='관심과목 검색'>관심과목 검색</option>
            </select>
            <input placeholder='관심과목를 입력하세요' type='text' disabled/>
          </div>
          {onSimulation ? (
            <button onClick={restartSimulation} disabled={!onSimulation}>
              <img src='/Search.svg' alt=''/>
              재시작
            </button>
          ) : (
            <button onClick={startSimulation} disabled={onSimulation || loading}>
              <img src='/Search.svg' alt=''/>
              시작
            </button>
          )}
        </div>

        {!onSimulation ? (
          <div className='container_box'>시작 버튼을 눌러 수강신청을 시작하세요</div>
        ) : loading ? (
          <div className='container_box'>로딩 중...</div>
        ) : !subjects.length ? (
          <div className='container_box'>관심과목이 존재하지 않습니다</div>
        ) : (
          <table className='container_box'>
            <thead>
            <tr>
              <th></th>
              {Object.values(DataFormats.SubjectTitles).map((title, index) => (
                <th key={index}>{title}</th>
              ))}
            </tr>
            </thead>
            <tbody>
            {subjects.map((subject, index) => (
              <tr key={index}>
                <td>
                  <button onClick={() => startStep(subject)}>신청</button>
                </td>
                <td>{String(subject.courseId).padStart(6, '0')}</td>
                <td>{String(subject.classId).padStart(3, '0')}</td>
                <td>{subject.courseTitle}</td>
                <td>{subject.credit}</td>
                <td>{subject.offeringDepartment}</td>
                <td>{subject.instructorName}</td>
                <td>{subject.classTime}</td>
              </tr>
            ))}
            </tbody>
          </table>
        )}

        <div className='title_container_box'>
          <div className='container_header_layout'>
            <h2>신청완료 된 과목</h2>
            <button className='small' onClick={refreshTable} disabled={!onSimulation || loading}>재조회</button>
          </div>

          <div className='container_box grid_layout'>
            {onSimulation && !loading && appliedSubjects.map((subject, index) => (
              <div key={index}
                   className={StatusClass[submitStatus.find(sub => subject.courseTitle === sub.courseTitle)?.applyType ?? ApplyDialogType.APPLY]}>
                {subject.courseTitle}
              </div>
            ))}
          </div>

        </div>
      </PageDefaultLayout>
    </>
  );
}

export default SimulationPage;