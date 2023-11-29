import PageDefaultLayout from '../layouts/PageDefaultLayout.tsx';
import {DataFormats} from '../constant/types.ts';

function DashBoardPage() {
  return (
    <PageDefaultLayout className=''>
      <div className='container_box'>
        <h2>최근 기록</h2>

        <table className='width_100'>
          <thead>
            <tr>
              <th>순번</th>
              {Object.values(DataFormats.SubjectTitles).map((title, index) => (
                <th key={index}>{title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              {Object.values(DataFormats.SubjectTitles).map((title, index) => (
                <td key={index}>{title}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

    </PageDefaultLayout>
  );
}

export default DashBoardPage;