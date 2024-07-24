import {useEffect, useReducer, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {ApplyDialogType, IApplyStatus, ISubject} from '../constant/types.ts';
import {reducer, simulationInitialState} from './simulationReducer.ts';
import {IErrorTypes} from '../constant/CheckFetchError.ts';
import API from '../constant/API.ts';


function useSimulation() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [subjects, setSubjects] = useState<ISubject[]>([]);
  const [appliedSubjects, setAppliedSubjects] = useState<ISubject[]>([]);
  const [submitStatus, setSubmitStatus] = useState<IApplyStatus[]>([]);

  const[state, dispatch] = useReducer(reducer, simulationInitialState);


  // 화면에 처음 들어왔을 때, 이미 시뮬레이션 진행 중인지 확인
  useEffect(() => {
    const playId = Number(localStorage.getItem('playId'));
    if (isNaN(playId) || playId <= 0) return;

    const Errors: IErrorTypes[] = [
      {errorBody: 'Mock not found',
        errorMessage: '시뮬레이션을 찾을 수 없습니다.',
        action: () => {
          dispatch({type: 'FINISH_SIMULATION_FORCE'});
          resetSimulation();
        }
      },
    ]

    setLoading(true);
    API.fetch2Json('/api/v2/mock/status', 'GET', {playId}, Errors, navigate)
      .then((res) => {
        if (res.interestedCourseToRegister.numberOfCourses === 0) {
          dispatch({type: 'FINISH_SIMULATION_FORCE'});
          resetSimulation();
          return;
        }

        setSubjects(res.interestedCourseToRegister.courses);
        setAppliedSubjects(res.registeredCourse.courses);
        setSubmitStatus(res.registeredCourse.courses.map((sub: ISubject) => ({...sub, applyType: ApplyDialogType.SUCCESS})));

        dispatch({type: 'START_SIMULATION', params: {simulationId: playId}});
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [navigate]);

  /** 다이얼로그를 엽니다.
   * @param selectedSubject 선택된 과목 */
  function startStep(selectedSubject: ISubject) {
    dispatch({type: 'OPEN_MACRO_DIALOG', params: {selectedSubject}});
  }

  /** 다음 다이얼로그를 열어줍니다.
   * @param nextStepType 다음 다이얼로그 타입
   * @param isSimulationFinished 시뮬레이션이 끝났는지 여부 */
  function nextStep(nextStepType: ApplyDialogType, isSimulationFinished?: boolean) {
    const isFinished = isSimulationFinished ?? !state.onSimulation;

    switch (nextStepType) {
      case ApplyDialogType.APPLY:
        dispatch({type: 'OPEN_APPLY_MESSAGE'});
        break;
      case ApplyDialogType.SUCCESS:
        dispatch({type: 'OPEN_APPLY_SUCCESS', params: {onSimulation: !isFinished}});
        break;
      case ApplyDialogType.FAILED:
        dispatch({type: 'OPEN_APPLY_FAIL', params: {onSimulation: !isFinished}});
        break;
      case ApplyDialogType.DONE:
        dispatch({type: 'OPEN_APPLY_DONE'});
        break;
      case ApplyDialogType.MACRO_FAILED:
        dispatch({type: 'OPEN_MACRO_FAILED'});
        break;
      case ApplyDialogType.CLOSE:
        if (isFinished) {
          dispatch({type: 'OPEN_SIMULATION_FINISH'});
          resetSimulation();
        }
        else
          dispatch({type: 'CLOSE_DIALOG'});
        break;
      case ApplyDialogType.FINISHED:
        dispatch({type: 'OPEN_SIMULATION_FINISH'});
        resetSimulation();
        break;
      default:
        throw new Error('잘못된 다이얼로그 타입입니다');
    }
  }

  /** 현재 진행중인 다이얼로그를 닫습니다.
   * @param refreshSubjects 과목 테이블을 새로고침할지 여부 */
  function stopStep(refreshSubjects?: boolean) {
    // Todo: 이거 어떤거 하는건지 알려주세요 - 아마도 완료된 과목 여부 추가해주는 코드 같습니다.
    if ([ApplyDialogType.SUCCESS, ApplyDialogType.FAILED].includes(state.dialogType)) {
      if (appliedSubjects.some((subject) => sameSubject(subject, state.selectedSubject!)))
        return;

      // setAppliedSubjects(prev => [...prev, selectedSubject!]);
      setSubmitStatus(prev => [...prev, {...state.selectedSubject!, applyType: state.dialogType}])
    }
    else if (state.dialogType === ApplyDialogType.DONE) {
      setSubmitStatus(prev =>
        prev.map((submissions) => {
          if (submissions.courseTitle === state.selectedSubject?.courseTitle && submissions.instructorName === state.selectedSubject?.instructorName)
            return {...state.selectedSubject!, applyType: ApplyDialogType.DONE};
          else
            return submissions;
        })
      );
    }

    if (state.onSimulation || [ApplyDialogType.FINISHED, ApplyDialogType.ERROR].includes(state.dialogType)) {
      dispatch({type: 'CLOSE_DIALOG'});
    }
    else {
      dispatch({type: 'OPEN_SIMULATION_FINISH'});
      return;
    }

    if (refreshSubjects) {
      refreshTable();
      return;
    }
  }

  /** 현재 오류를 다이얼로그로 띄워줍니다.
   * @param message 오류 메시지
   * @param forceFinish 시뮬레이션을 강제로 종료할지 여부 */
  function stepError(message: string, forceFinish?: boolean) {
    const finish = !forceFinish ?? !state.onSimulation;

    dispatch({type: 'OPEN_ERROR_MESSAGE', params: {errorMessage: message, onSimulation: finish}});

    if (finish)
      resetSimulation();
  }

  /** 사용자가 입력한 매크로 방지 코드를 변경합니다.
   * @param macroNumber 매크로 방지 코드 */
  function updateMacroNumber(macroNumber: string) {
    dispatch({type: 'CHANGE_MACRO', params: {macroNumber}});
  }

  function startSimulation() {
    setLoading(true);
    API.fetch2Json('/api/v2/mock/start', 'GET', {}, [], navigate)
      .then((res) => {
        // console.log(res);

        localStorage.setItem('playId', res.playId);
        setSubjects(res.interestedCourse.courses);
        setAppliedSubjects([]);
        setSubmitStatus([]);

        dispatch({type: 'START_SIMULATION', params: {simulationId: res.playId}});
      })
      .catch((err) => {
        stepError(err.message, true);
        console.error(err);
      })
      .finally(() => setLoading(false));
  }

  function resetSimulation() {
    setLoading(false);
    setSubjects([]);
    setAppliedSubjects([]);
    setSubmitStatus([]);
    localStorage.removeItem('playId');
  }

  function refreshTable() {
    const playId = state.simulationId <= 0 ? Number(localStorage.getItem('playId')) : state.simulationId;
    if (isNaN(playId)) return;

    const Errors: IErrorTypes[] = [
      {errorBody: 'Mock not found', errorMessage: '시뮬레이션을 찾을 수 없습니다.'},
    ]

    setLoading(true);
    API.fetch2Json('/api/v2/mock/status', 'GET', {playId}, Errors, navigate)
      .then((res) => {
        if (res.interestedCourseToRegister.numberOfCourses === 0) {
          stepError('시뮬레이션을 찾을 수 없습니다.', true);
          return;
        }

        setSubjects(res.interestedCourseToRegister.courses);
        setAppliedSubjects(res.registeredCourse.courses);

        dispatch({type: 'START_SIMULATION', params: {simulationId: Number(playId)}});
      })
      .catch((err) => {
        stepError(err.message, true);
        console.error(err);
      })
      .finally(() => setLoading(false));
  }

  return {
    ...state, loading, subjects, appliedSubjects, submitStatus,
    startSimulation, refreshTable, startStep, nextStep, stopStep, stepError, updateMacroNumber
  }
}

function sameSubject(a: ISubject, b: ISubject) {
  return a.courseId === b.courseId && a.classId === b.classId && a.offeringDepartment === b.offeringDepartment;
}

export default useSimulation;