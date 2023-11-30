import {useState} from 'react';
import PageDefaultLayout from '../layouts/PageDefaultLayout.tsx';
import MacroDialog from '../layouts/dialog/MacroDialog.tsx';
import SubjectApplyDialog from '../layouts/dialog/SubjectApplyDialog.tsx';
import ApplySuccessDialog from '../layouts/dialog/ApplySuccessDialog.tsx';
import ApplyFailDialog from '../layouts/dialog/ApplyFailDialog.tsx';
import ApplyDoneDialog from '../layouts/dialog/ApplyDoneDialog.tsx';
import {ApplyType, DataFormats} from '../constant/types.ts';
import '@styles/components/TableStyle.scss';

function SimulationPage() {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [applyType, setApplyType] = useState<ApplyType>(ApplyType.Macro);
  const [selectedSubjectTitle, setSelectedSubjectTitle] = useState<string>('');

  document.title = 'AllCll | 수강신청';

  function openDialog(subjectTitle: string) {
    setSelectedSubjectTitle(subjectTitle);
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
      // Todo: Refresh table
      closeDialog();
    }
  }

  return (
    <>
      <MacroDialog isOpen={isDialogOpen && applyType === ApplyType.Macro} closeDialog={closeDialog} nextStep={nextStep}/>
      <SubjectApplyDialog isOpen={isDialogOpen && applyType === ApplyType.Apply} closeDialog={closeDialog} nextStep={nextStep} subjectName={selectedSubjectTitle}/>
      <ApplySuccessDialog isOpen={isDialogOpen && applyType === ApplyType.SUCCESS} closeDialog={closeDialog} nextStep={nextStep}/>
      <ApplyFailDialog isOpen={isDialogOpen && applyType === ApplyType.FAIL} closeDialog={closeDialog}/>
      <ApplyDoneDialog isOpen={isDialogOpen && applyType === ApplyType.DONE} closeDialog={closeDialog}/>

      <PageDefaultLayout className=''>
        <div className='search_layout'>
          <div className='inputs_layout'>
            <select name='' id='' disabled>
              <option value='학수번호 검색'>학수번호 검색</option>
            </select>
            <input placeholder='학수번호를 입력하세요' type='text' disabled/>
          </div>
          <button onClick={() => openDialog('테스트 과목')}>
            <img src='/Search.svg' alt=''/>
            시작
          </button>
        </div>

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
          <tr>
            <td>
              <button>신청</button>
            </td>
            {Object.values(DataFormats.SubjectTitles).map((title, index) => (
              <td key={index}>{title}</td>
            ))}
          </tr>
          </tbody>
        </table>
      </PageDefaultLayout>
    </>
  );
}

export default SimulationPage;