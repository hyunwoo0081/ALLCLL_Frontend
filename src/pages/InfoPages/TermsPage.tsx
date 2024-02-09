import PageDefaultLayout from '../../layouts/PageDefaultLayout.tsx';
import Terms from '../../layouts/Terms.tsx';

function TermsPage() {
  document.title = 'ALLCLL | 개인정보이용약관';

  return (
    <PageDefaultLayout className=''>
      <div className='container_box'>
         <Terms />
      </div>

    </PageDefaultLayout>
  );
}

export default TermsPage;