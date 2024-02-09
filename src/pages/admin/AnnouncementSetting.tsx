import {useEffect, useState} from 'react';
import AdminNavigation from '../../components/AdminNavigation.tsx';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState, convertToRaw, convertFromHTML} from 'draft-js';
import draftjsToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

function AnnouncementSetting() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [htmlString, setHtmlString] = useState('');

  useEffect(() => {
    // 공지사항 불러오기
    // Todo: 서버에서 공지사항 불러오기
    const DefaultAnnouncement = '<p>asd<strong>asdasdq</strong>wee<strong><em>ee</em></strong></p>';
    updateAnnouncement(DefaultAnnouncement);
  }, []);

  const updateTextDescription = async (state: EditorState) => {
    await setEditorState(state);
    const html = draftjsToHtml(convertToRaw(editorState.getCurrentContent()));
    setHtmlString(html);
  };

  // const uploadCallback = () => {
  //   console.log('이미지 업로드');
  // };

  function updateAnnouncement(htmlStr: string) {
    const html = convertFromHTML(htmlStr);
    const contentState = EditorState.createWithContent(
      ContentState.createFromBlockArray(
        html.contentBlocks, html.entityMap
      )
    );

    setEditorState(contentState);
  }

  function saveAnnouncement() {
    // 공지사항 저장
    // Todo: 공지사항 API 연결
    console.log(htmlString);
  }
  
  return (
    <>
      <AdminNavigation/>

      <div className='responsive'>
        <div className='admin_main'>
          <h1>공지사항 설정</h1>

          <Editor
            placeholder='공지사항을 작성해주세요'
            editorState={editorState}
            onEditorStateChange={updateTextDescription}
            // toolbar={{
            //   image: { uploadCallback: uploadCallback },
            // }}
            localization={{ locale: 'ko' }}
            editorStyle={{
              height: '400px',
              width: '100%',
              border: '1px solid lightgray',
              borderRadius: '6px',
              padding: '20px',
              backgroundColor: 'white',
            }}
          />
          <button onClick={saveAnnouncement}>저장</button>
        </div>
      </div>
    </>
  );
}

export default AnnouncementSetting;