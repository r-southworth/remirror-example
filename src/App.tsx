import { useCallback, useState } from 'react';
import type { RemirrorJSON } from 'remirror';
import { OnChangeJSON, useRemirror } from '@remirror/react';
import { WysiwygEditor } from '@remirror/react-editors/wysiwyg';
import {BoldExtension, CalloutExtension, ItalicExtension} from 'remirror/extensions';

const STORAGE_KEY = 'remirror-editor-content';

const {manager} = useRemirror({
  extensions:()=>[
    new BoldExtension(),
    new ItalicExtension(),
    new CalloutExtension({defaultType: 'warn'}),
  ],
});

const App: React.FC = () => {
  const [initialContent] = useState<RemirrorJSON | undefined>(() => {
    // Retrieve the JSON from localStorage (or undefined if not found)
    const content = window.localStorage.getItem(STORAGE_KEY);
    return content ? JSON.parse(content) : undefined;
  });

  const handleEditorChange = useCallback((json: RemirrorJSON) => {
    // Store the JSON in localStorage
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(json));
  }, []);

  return <MyEditor onChange={handleEditorChange} initialContent={initialContent} />;
};

interface MyEditorProps {
  onChange: (json: RemirrorJSON) => void;
  initialContent?: RemirrorJSON;
}

const MyEditor: React.FC<MyEditorProps> = ({ onChange, initialContent }) => {
  return (
    <div style={{ padding: 16 }}>
      <WysiwygEditor placeholder='Enter text...' initialContent={initialContent}>
        <OnChangeJSON onChange={onChange} />
      </WysiwygEditor>
    </div>
  );
};

export default App;