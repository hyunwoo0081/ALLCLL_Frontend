import {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import AdminNavigation from '../../components/AdminNavigation.tsx';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState, convertToRaw, convertFromHTML} from 'draft-js';
import draftjsToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import API from "../../constant/API.ts";

function AnnouncementSetting() {
  const navigate = useNavigate();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [htmlString, setHtmlString] = useState('');

  useEffect(() => {
    // 공지사항 불러오기
    API.fetch2Json('/api/v2/notification/last', 'GET', {}, [], navigate)
      .then(res => updateAnnouncement(res.content))
      .catch(e => {
        console.error(e);
        updateAnnouncement('');
      });
  }, [navigate]);

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
    API.fetch2Json('/api/v2/notification/new', 'POST', {content: htmlString}, [], navigate)
      .then(res => console.log(res))
      .catch(e => {
        console.error(e);
        alert('공지사항을 저장하지 못했습니다.')
      });
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