import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import PageDefaultLayout from '../layouts/PageDefaultLayout.tsx';
import MacroDialog from '../layouts/dialog/MacroDialog.tsx';
import SubjectApplyDialog from '../layouts/dialog/SubjectApplyDialog.tsx';
import ApplySuccessDialog from '../layouts/dialog/ApplySuccessDialog.tsx';
import ApplyFailDialog from '../layouts/dialog/ApplyFailDialog.tsx';
import ApplyDoneDialog from '../layouts/dialog/ApplyDoneDialog.tsx';
import FinishDialog from '../layouts/dialog/FinishDialog.tsx';
import {ApplyType, DataFormats, ISubject} from '../constant/types.ts';
import {IErrorTypes} from '../constant/CheckFetchError.ts';
import API from '../constant/API.ts';
import '@styles/components/TableStyle.scss';

function SimulationPage() {
  const navigate = useNavigate();
  
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [applyType, setApplyType] = useState<ApplyType>(ApplyType.Macro);
  const [selectedSubject, setSelectedSubject] = useState<ISubject|null>(null);

  const [onSimulation, setOnSimulation] = useState<boolean>(false);
  const [simulationFinishTrigger, setSimulationFinishTrigger] = useState<boolean>(false);
  const [simulationId, setSimulationId] = useState<number>(-1);
  const [loading, setLoading] = useState<boolean>(false);
  const [subjects, setSubjects] = useState<ISubject[]>([]);
  const [appliedSubjects, setAppliedSubjects] = useState<ISubject[]>([]);

  document.title = 'AllCll | 수강신청';

  // 이미 시뮬레이션 진행 중인지 확인
  useEffect(() => {
    const playId = localStorage.getItem('playId');
    if (playId === null) return;

    const Errors: IErrorTypes[] = [
      {errorBody: 'Mock not found',
        errorMessage: '시뮬레이션을 찾을 수 없습니다.',
        action: () => {
          setOnSimulation(false);
          localStorage.removeItem('playId');
        }
      },
    ]

    setLoading(true);
    API.fetch2Json('/api/v2/mock/status', 'GET', {playId}, Errors, navigate)
      .then((res) => {
        setSimulationId(Number(playId));
        setSubjects(res.interestedCourseToRegister.courses);
        setOnSimulation(true);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [navigate]);

  // Finish Trigger
  useEffect(() => {
    if (!onSimulation || !simulationFinishTrigger || !isDialogOpen) return;

    setOnSimulation(false);
    setSimulationFinishTrigger(false);
    setSubjects([]);
    setAppliedSubjects([]);
    localStorage.removeItem('playId');

    setIsDialogOpen(true);
    setApplyType(ApplyType.FINISHED);
  }, [onSimulation, simulationFinishTrigger, isDialogOpen]);

  function openDialog(subject: ISubject) {
    setSelectedSubject(subject);
    setApplyType(ApplyType.Macro);
    setIsDialogOpen(true);
  }
  function closeDialog() {
    setIsDialogOpen(false);
    setApplyType(ApplyType.Macro);
  }
  function nextStep(nextApplyType?: ApplyType) {
    if (nextApplyType !== undefined)
      setApplyType(nextApplyType);
    else if (applyType < ApplyType.SUCCESS)
      setApplyType(prev => prev+1);
    else {
      setAppliedSubjects(prev => [...prev, selectedSubject!]);
      refreshTable();
      closeDialog();
    }
  }

  function startSimulation() {
    setLoading(true);
    API.fetch2Json('/api/v2/mock/start', 'GET', {}, [], navigate)
      .then((res) => {
        console.log(res);

        localStorage.setItem('playId', res.interestedCourse.playId);
        setSimulationId(res.interestedCourse.playId);
        setSubjects(res.interestedCourse.courses);
        setAppliedSubjects([]);
        setOnSimulation(true);
      })
      .catch((err) => {
        alert('시뮬레이션을 시작할 수 없습니다');
        console.error(err);
      })
      .finally(() => setLoading(false));
  }

  function refreshTable() {
    setLoading(true);
    Promise.all([
      API.fetch2Json('/api/v2/mock/courses/unregistered', 'GET', {playId: simulationId}, [], navigate),
      API.fetch2Json('/api/v2/mock/courses/registered', 'GET', {playId: simulationId}, [], navigate)
    ])
      .then((res) => {
        const [unregistered, registered] = res;

        setSubjects(unregistered.unregisteredInterestedCourses);
        setAppliedSubjects(registered.registeredCourses);
        setOnSimulation(true);
      })
      .catch((err) => {
        alert('적절하지 않은 접근입니다');
        console.error(err);
      })
      .finally(() => setLoading(false));
  }

  return (
    <>
      <MacroDialog isOpen={isDialogOpen && applyType === ApplyType.Macro} closeDialog={closeDialog} nextStep={nextStep}/>
      <SubjectApplyDialog isOpen={isDialogOpen && applyType === ApplyType.Apply} closeDialog={closeDialog} nextStep={nextStep} selectedSubject={selectedSubject} setFinishTrigger={setSimulationFinishTrigger}/>
      <ApplySuccessDialog isOpen={isDialogOpen && applyType === ApplyType.SUCCESS} closeDialog={closeDialog} nextStep={nextStep}/>
      <ApplyFailDialog isOpen={isDialogOpen && applyType === ApplyType.FAIL} closeDialog={closeDialog}/>
      <ApplyDoneDialog isOpen={isDialogOpen && applyType === ApplyType.DONE} closeDialog={closeDialog}/>
      <FinishDialog isOpen={isDialogOpen && applyType === ApplyType.FINISHED} closeDialog={closeDialog} playId={simulationId}/>

      <PageDefaultLayout className=''>
        <div className='search_layout'>
          <div className='inputs_layout'>
            <select name='' id='' disabled>
              <option value='학수번호 검색'>학수번호 검색</option>
            </select>
            <input placeholder='학수번호를 입력하세요' type='text' disabled/>
          </div>
          <button onClick={startSimulation} disabled={onSimulation || loading}>
            <img src='/Search.svg' alt=''/>
            시작
          </button>
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
                  <button onClick={() => openDialog(subject)}>신청</button>
                </td>
                {Object.values(DataFormats.SubjectTitles).map((title, index) => (
                  <td key={index}>{title}</td>
                ))}
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
            {appliedSubjects.map((subject, index) => (
              <div key={index}>{subject.courseTitle}</div>
            ))}
          </div>

        </div>
      </PageDefaultLayout>
    </>
  );
}

export default SimulationPage;