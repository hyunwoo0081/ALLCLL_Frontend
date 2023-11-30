// import {useState} from 'react';
import PageDefaultLayout from '../layouts/PageDefaultLayout.tsx';
import {DataFormats, ISubject} from '../constant/types.ts';
import '@styles/components/TableStyle.scss';


const SearchTitles: Array<keyof ISubject> = ['courseTitle', 'instructorName', 'offeringDepartment', 'classTime'];
const SearchDisabled: Array<keyof ISubject> = ['offeringDepartment', 'classTime'];

function InterestPage() {
  // const [subjects, setSubjects] = useState<ISubject[]>([]);
  
  return (
    <PageDefaultLayout className=''>
      <div className='search_layout'>
        <div className='inputs_layout'>
          {SearchTitles.map((title, index) => (
            <input key={index}
                   placeholder={DataFormats.SubjectTitles[title]}
                   type='text'
                   disabled={SearchDisabled.includes(title)}/>
          ))}
        </div>
        <button>
          <img src='/Search.svg' alt=''/>
          검색
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
  );
}

export default InterestPage;