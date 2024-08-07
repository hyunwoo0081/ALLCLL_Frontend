import {ApplyDialogType} from '../constant/types.ts';
import {Subject} from '../constant/fetchTypes.ts';

export interface ISimulation {
  dialogType: ApplyDialogType;
  selectedSubject: Subject|null;
  macroNumber: string;
  onSimulation: boolean;
  simulationId: number;
  errorMessage: string;
}

export interface ISimulationActions {
  type: 'START_SIMULATION' | 'FINISH_SIMULATION_FORCE' | 'CHANGE_MACRO' | 'OPEN_MACRO_DIALOG' | 'OPEN_APPLY_MESSAGE' | 'OPEN_APPLY_SUCCESS' | 'OPEN_APPLY_FAIL' | 'OPEN_APPLY_DONE' | 'OPEN_MACRO_FAILED' | 'OPEN_ERROR_MESSAGE' | 'OPEN_SIMULATION_FINISH' | 'CLOSE_DIALOG';
  params?: {
    dialogType?: ApplyDialogType;
    macroNumber?: string;
    selectedSubject?: Subject|null;
    onSimulation?: boolean;
    simulationId?: number;
    errorMessage?: string;
  };
}

// Todo: simulationFinishTrigger 없애기
export const simulationInitialState: ISimulation = {
  dialogType: ApplyDialogType.CLOSE,
  macroNumber: '',
  selectedSubject: null,
  onSimulation: false,
  simulationId: -1,
  errorMessage: '',
}

export function reducer(state: ISimulation, action: ISimulationActions): ISimulation {
  switch (action.type) {
    case 'START_SIMULATION':
      return {
        ...state,
        onSimulation: true,
        simulationId: action.params?.simulationId ?? -1,
      };
    case 'FINISH_SIMULATION_FORCE':
      return {
        ...state,
        onSimulation: false,
      };
    case 'CHANGE_MACRO':
      return {
        ...state,
        macroNumber: action.params?.macroNumber ?? '',
      }
    case 'OPEN_MACRO_DIALOG':
      return {
        ...state,
        dialogType: ApplyDialogType.MACRO,
        selectedSubject: action.params?.selectedSubject ?? null,
        macroNumber: ''
      };
    // 과목을 신청하시겠습니까? 다이얼로그
    case 'OPEN_APPLY_MESSAGE':
      return {
        ...state,
        dialogType: ApplyDialogType.APPLY
      };
    case 'OPEN_APPLY_SUCCESS':
      return {
        ...state,
        onSimulation: action.params?.onSimulation ?? false,
        dialogType: ApplyDialogType.SUCCESS,
      };
    case 'OPEN_APPLY_FAIL':
      return {
        ...state,
        onSimulation: action.params?.onSimulation ?? false,
        dialogType: ApplyDialogType.FAILED,
      };
    case 'OPEN_APPLY_DONE':
      return {
        ...state,
        dialogType: ApplyDialogType.DONE,
      };
    case 'OPEN_MACRO_FAILED':
      return {
        ...state,
        dialogType: ApplyDialogType.MACRO_FAILED,
      };
    case 'OPEN_ERROR_MESSAGE':
      return {
        ...state,
        dialogType: ApplyDialogType.ERROR,
        errorMessage: action.params?.errorMessage ?? '',
        onSimulation: action.params?.onSimulation ?? false
      };
    // 시뮬레이션이 정상 종료
    case 'OPEN_SIMULATION_FINISH':
      return {
        ...state,
        onSimulation: false,
        dialogType: ApplyDialogType.FINISHED,
      };
    case 'CLOSE_DIALOG':
      return {
        ...state,
        dialogType: ApplyDialogType.CLOSE,
        selectedSubject: null,
        macroNumber: '',
      };
  }
}