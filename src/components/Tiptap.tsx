'use client'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import TextAlign from '@tiptap/extension-text-align'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import Highlight from '@tiptap/extension-highlight'
import Image from '@tiptap/extension-image'
import Typography from '@tiptap/extension-typography'
import Superscript from '@tiptap/extension-superscript'
import Subscript from '@tiptap/extension-subscript'
import {
    Bold,
    Italic,
    Strikethrough,
    Code,
    Heading1,
    Heading2,
    Heading3,
    List,
    ListOrdered,
    Quote,
    Undo,
    Redo,
    Minus,
    AlignLeft,
    AlignCenter,
    AlignRight,
    AlignJustify,
    CheckSquare,
    Highlighter,
    Image as ImageIcon,
    ArrowUp,
    ArrowDown
} from 'lucide-react'
import { useEffect } from 'react'
import cn from '@/core/utils/class-names'

interface PropTypes {
    placeholder: string | undefined
    value?: string;
    onChange?: (value: string) => void;
    label?: string;
    labelClassName?: string;
    className?: string;
    isUploadImage?: boolean;
    notes?: string;
}

const MenuBar = ({ editor, isUploadImage }: any) => {
    if (!editor) {
        return null
    }

    const buttonClass = (isActive = false) =>
        `p-2 rounded hover:bg-gray-200 transition-colors ${isActive ? 'bg-gray-300 text-blue-600' : 'text-gray-700'
        } disabled:opacity-50 disabled:cursor-not-allowed`

    const handleImageUpload = () => {
        const url = window.prompt('Enter image URL:')
        if (url) {
            editor.chain().focus().setImage({ src: url }).run()
        }
    }

    return (
        <div className="border-b border-gray-300 p-2 flex flex-wrap gap-1 bg-gray-50">
            {/* Text Formatting */}
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={!editor.can().chain().focus().toggleBold().run()}
                className={buttonClass(editor.isActive('bold'))}
                title="Bold (Ctrl+B)"
            >
                <Bold size={18} />
            </button>

            <button
                type="button"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={!editor.can().chain().focus().toggleItalic().run()}
                className={buttonClass(editor.isActive('italic'))}
                title="Italic (Ctrl+I)"
            >
                <Italic size={18} />
            </button>

            <button
                type="button"
                onClick={() => editor.chain().focus().toggleStrike().run()}
                disabled={!editor.can().chain().focus().toggleStrike().run()}
                className={buttonClass(editor.isActive('strike'))}
                title="Strikethrough"
            >
                <Strikethrough size={18} />
            </button>

            <button
                type="button"
                onClick={() => editor.chain().focus().toggleHighlight().run()}
                className={buttonClass(editor.isActive('highlight'))}
                title="Highlight"
            >
                <Highlighter size={18} />
            </button>

            <button
                type="button"
                onClick={() => editor.chain().focus().toggleSuperscript().run()}
                className={buttonClass(editor.isActive('superscript'))}
                title="Superscript"
            >
                <ArrowUp size={18} />
            </button>

            <button
                type="button"
                onClick={() => editor.chain().focus().toggleSubscript().run()}
                className={buttonClass(editor.isActive('subscript'))}
                title="Subscript"
            >
                <ArrowDown size={18} />
            </button>

            <button
                type="button"
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                disabled={!editor.can().chain().focus().toggleCodeBlock().run()}
                className={buttonClass(editor.isActive('codeBlock'))}
                title="Code Block"
            >
                <Code size={18} />
            </button>

            <div className="w-px h-6 bg-gray-300 mx-1" />

            {/* Headings */}
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={buttonClass(editor.isActive('heading', { level: 1 }))}
                title="Heading 1"
            >
                <Heading1 size={18} />
            </button>

            <button
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={buttonClass(editor.isActive('heading', { level: 2 }))}
                title="Heading 2"
            >
                <Heading2 size={18} />
            </button>

            <button
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                className={buttonClass(editor.isActive('heading', { level: 3 }))}
                title="Heading 3"
            >
                <Heading3 size={18} />
            </button>

            <div className="w-px h-6 bg-gray-300 mx-1" />

            {/* Text Align */}
            <button
                type="button"
                onClick={() => editor.chain().focus().setTextAlign('left').run()}
                className={buttonClass(editor.isActive({ textAlign: 'left' }))}
                title="Align Left"
            >
                <AlignLeft size={18} />
            </button>

            <button
                type="button"
                onClick={() => editor.chain().focus().setTextAlign('center').run()}
                className={buttonClass(editor.isActive({ textAlign: 'center' }))}
                title="Align Center"
            >
                <AlignCenter size={18} />
            </button>

            <button
                type="button"
                onClick={() => editor.chain().focus().setTextAlign('right').run()}
                className={buttonClass(editor.isActive({ textAlign: 'right' }))}
                title="Align Right"
            >
                <AlignRight size={18} />
            </button>

            <button
                type="button"
                onClick={() => editor.chain().focus().setTextAlign('justify').run()}
                className={buttonClass(editor.isActive({ textAlign: 'justify' }))}
                title="Justify"
            >
                <AlignJustify size={18} />
            </button>

            <div className="w-px h-6 bg-gray-300 mx-1" />

            {/* Lists */}
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={buttonClass(editor.isActive('bulletList'))}
                title="Bullet List"
            >
                <List size={18} />
            </button>

            <button
                type="button"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={buttonClass(editor.isActive('orderedList'))}
                title="Numbered List"
            >
                <ListOrdered size={18} />
            </button>

            <button
                type="button"
                onClick={() => editor.chain().focus().toggleTaskList().run()}
                className={buttonClass(editor.isActive('taskList'))}
                title="Task List"
            >
                <CheckSquare size={18} />
            </button>

            <div className="w-px h-6 bg-gray-300 mx-1" />

            {/* Block Elements */}
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={buttonClass(editor.isActive('blockquote'))}
                title="Blockquote"
            >
                <Quote size={18} />
            </button>

            <button
                type="button"
                onClick={() => editor.chain().focus().setHorizontalRule().run()}
                className={buttonClass()}
                title="Horizontal Rule"
            >
                <Minus size={18} />
            </button>

            {isUploadImage && (
                <button
                    type="button"
                    onClick={handleImageUpload}
                    className={buttonClass()}
                    title="Insert Image"
                >
                    <ImageIcon size={18} />
                </button>
            )}

            <div className="w-px h-6 bg-gray-300 mx-1" />
        </div>
    )
}

const TextEditor = (props: PropTypes) => {
    const {
        placeholder = 'Write here...',
        value,
        onChange,
        className,
        label = 'Editor',
        labelClassName,
        isUploadImage = false,
        notes,
    } = props

    const handleImageUpload = async (file: File) => {
        // Implementasi upload image
        // Anda bisa mengganti ini dengan logic upload ke server
        return new Promise<string>((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = () => resolve(reader.result as string)
            reader.onerror = reject
            reader.readAsDataURL(file)
        })
    }

    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({
                placeholder: placeholder,
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            TaskList,
            TaskItem.configure({
                nested: true,
            }),
            Highlight.configure({
                multicolor: true,
            }),
            Image,
            Typography,
            Superscript,
            Subscript,
        ],
        content: value || '',
        immediatelyRender: false,
        editorProps: {
            attributes: {
                class: 'tiptap-editor',
            },
        },
        onUpdate: ({ editor }) => {
            const html = editor.getHTML();
            onChange?.(html);
        },
    })

    useEffect(() => {
        const styleId = 'tiptap-custom-styles'
        if (!document.getElementById(styleId)) {
            const style = document.createElement('style')
            style.id = styleId
            style.textContent = `
        .tiptap-editor {
          min-height: 200px;
          padding: 1rem;
          outline: none;
        }
        
        .tiptap-editor p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #adb5bd;
          pointer-events: none;
          height: 0;
        }
        
        .tiptap-editor pre {
          background: #1e293b;
          color: #e2e8f0;
          font-family: 'JetBrains Mono', 'Courier New', monospace;
          padding: 1rem;
          border-radius: 0.5rem;
          overflow-x: auto;
          margin: 1rem 0;
        }
        
        .tiptap-editor pre code {
          color: inherit;
          padding: 0;
          background: none;
          font-size: 0.875rem;
          line-height: 1.5;
        }
        
        .tiptap-editor blockquote {
          border-left: 4px solid #e5e7eb;
          padding-left: 1rem;
          margin-left: 0;
          font-style: italic;
          color: #6b7280;
          margin: 1rem 0;
        }
        
        .tiptap-editor ul {
          list-style-type: disc;
          padding-left: 1.5rem;
          margin: 0.5rem 0;
        }
        
        .tiptap-editor ol {
          list-style-type: decimal;
          padding-left: 1.5rem;
          margin: 0.5rem 0;
        }

        .tiptap-editor ul[data-type="taskList"] {
          list-style: none;
          padding-left: 0;
        }

        .tiptap-editor ul[data-type="taskList"] li {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
        }

        .tiptap-editor ul[data-type="taskList"] li > label {
          flex: 0 0 auto;
          margin-top: 0.2rem;
          user-select: none;
        }

        .tiptap-editor ul[data-type="taskList"] li > div {
          flex: 1 1 auto;
        }

        .tiptap-editor ul[data-type="taskList"] input[type="checkbox"] {
          cursor: pointer;
        }
        
        .tiptap-editor li {
          margin: 0.25rem 0;
        }
        
        .tiptap-editor h1 {
          font-size: 2rem;
          font-weight: bold;
          margin: 1rem 0 0.5rem 0;
        }
        
        .tiptap-editor h2 {
          font-size: 1.5rem;
          font-weight: bold;
          margin: 1rem 0 0.5rem 0;
        }
        
        .tiptap-editor h3 {
          font-size: 1.25rem;
          font-weight: bold;
          margin: 1rem 0 0.5rem 0;
        }
        
        .tiptap-editor p {
          margin: 0.5rem 0;
        }
        
        .tiptap-editor hr {
          border: none;
          border-top: 2px solid #e5e7eb;
          margin: 2rem 0;
        }
        
        .tiptap-editor strong {
          font-weight: bold;
        }
        
        .tiptap-editor em {
          font-style: italic;
        }
        
        .tiptap-editor s {
          text-decoration: line-through;
        }

        .tiptap-editor mark {
          background-color: #fef08a;
          padding: 0.125rem 0.25rem;
          border-radius: 0.25rem;
        }

        .tiptap-editor sup {
          vertical-align: super;
          font-size: 0.75em;
        }

        .tiptap-editor sub {
          vertical-align: sub;
          font-size: 0.75em;
        }

        .tiptap-editor img {
          max-width: 100%;
          height: auto;
          border-radius: 0.5rem;
          margin: 1rem 0;
        }

        .tiptap-editor [style*="text-align: left"] {
          text-align: left;
        }

        .tiptap-editor [style*="text-align: center"] {
          text-align: center;
        }

        .tiptap-editor [style*="text-align: right"] {
          text-align: right;
        }

        .tiptap-editor [style*="text-align: justify"] {
          text-align: justify;
        }
      `
            document.head.appendChild(style)
        }
    }, [])

    return (
        <div className={className}>
            {label && (
                <label className={cn("mb-2 block font-medium", labelClassName)}>{label}</label>
            )}
            <div className="flex flex-col gap-2 border border-gray-300 rounded-lg overflow-hidden bg-white">
                <MenuBar editor={editor} isUploadImage={isUploadImage} />
                <EditorContent editor={editor} />
            </div>
             {notes && <div className="text-xs mt-1">{notes}</div>}
        </div>
    )
}

export default TextEditor