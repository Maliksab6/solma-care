'use client'

import { useState, useCallback } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextStyle from '@tiptap/extension-text-style'
import FontFamily from '@tiptap/extension-font-family'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import Table from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import Highlight from '@tiptap/extension-highlight'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { common, createLowlight } from 'lowlight'
import mammoth from 'mammoth'
import {
  Bold, Italic, Underline as UnderlineIcon, Strikethrough, List, ListOrdered,
  Quote, Code, Heading1, Heading2, Heading3, Image as ImageIcon, Link as LinkIcon,
  AlignLeft, AlignCenter, AlignRight, Undo, Redo, Highlighter, Table as TableIcon,
  Plus, Trash2, Upload, Clipboard, Type,
} from 'lucide-react'

const lowlight = createLowlight(common)

const CustomTextStyle = TextStyle.extend({
  addAttributes() {
    return {
      fontSize: {
        default: null,
        parseHTML: element => element.style.fontSize?.replace(/['"]+/g, ''),
        renderHTML: attributes => {
          if (!attributes.fontSize) return {}
          return { style: `font-size: ${attributes.fontSize}` }
        }
      }
    }
  },
  addCommands() {
    return {
      setFontSize: (fontSize) => ({ chain }) => chain().setMark('textStyle', { fontSize }).run(),
      unsetFontSize: () => ({ chain }) => chain().setMark('textStyle', { fontSize: null }).removeEmptyTextStyle().run(),
    }
  }
})

function cleanWordHtml(html) {
  let cleaned = html
  cleaned = cleaned.replace(/<xml[\s\S]*?<\/xml>/gi, '')
  cleaned = cleaned.replace(/<style[\s\S]*?<\/style>/gi, '')
  cleaned = cleaned.replace(/<meta[\s\S]*?>/gi, '')
  cleaned = cleaned.replace(/<link[\s\S]*?>/gi, '')
  cleaned = cleaned.replace(/<head[\s\S]*?<\/head>/gi, '')
  cleaned = cleaned.replace(/<o:[\s\S]*?>/gi, '').replace(/<\/o:[\s\S]*?>/gi, '')
  cleaned = cleaned.replace(/<v:[\s\S]*?>/gi, '').replace(/<\/v:[\s\S]*?>/gi, '')
  cleaned = cleaned.replace(/<w:[\s\S]*?>/gi, '').replace(/<\/w:[\s\S]*?>/gi, '')
  cleaned = cleaned.replace(/<m:[\s\S]*?>/gi, '').replace(/<\/m:[\s\S]*?>/gi, '')
  cleaned = cleaned.replace(/<st1:[\s\S]*?>/gi, '').replace(/<\/st1:[\s\S]*?>/gi, '')
  cleaned = cleaned.replace(/<span[^>]*style="[^"]*mso-bookmark:[^"]*"[^>]*>([\s\S]*?)<\/span>/gi, '$1')
  cleaned = cleaned.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, '<h2>$1</h2>')
  cleaned = cleaned.replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, '<h3>$1</h3>')
  cleaned = cleaned.replace(/<h5[^>]*>([\s\S]*?)<\/h5>/gi, '<h3>$1</h3>')
  cleaned = cleaned.replace(/<h6[^>]*>([\s\S]*?)<\/h6>/gi, '<h3>$1</h3>')
  cleaned = cleaned.replace(/\s*xmlns(?::\w+)?="[^"]*"/gi, '')
  cleaned = cleaned.replace(/\s*class="[^"]*Mso[^"]*"/gi, '')
  cleaned = cleaned.replace(/<div[^>]*>([\s\S]*?)<\/div>/gi, '$1')
  cleaned = cleaned.replace(/<p[^>]*>\s*(&nbsp;|\u00A0|\s)*\s*<\/p>/gi, '')
  cleaned = cleaned.replace(/<b[^>]*>([\s\S]*?)<\/b>/gi, '<strong>$1</strong>')
  cleaned = cleaned.replace(/<i[^>]*>([\s\S]*?)<\/i>/gi, '<em>$1</em>')
  return cleaned
}

function RichTextEditor({ content, onChange }) {
  const [showLinkInput, setShowLinkInput] = useState(false)
  const [linkUrl, setLinkUrl] = useState('')
  const [showImageInput, setShowImageInput] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
  const [showYouTubeInput, setShowYouTubeInput] = useState(false)
  const [youTubeUrl, setYouTubeUrl] = useState('')
  const [showTableMenu, setShowTableMenu] = useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3] }, codeBlock: false }),
      CustomTextStyle, FontFamily, TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Underline, Link.configure({ openOnClick: false }), Image.configure({ inline: false }),
      Table.configure({ resizable: true }), TableRow, TableCell, TableHeader,
      Highlight, CodeBlockLowlight.configure({ lowlight }),
    ],
    content: content || '',
    onUpdate: ({ editor }) => onChange?.(editor.getHTML()),
    editorProps: {
      transformPastedHTML(html) {
        return html.replace(/>\s*\n\s*</g, '><').replace(/<p>\s*<\/p>/g, '').replace(/\n/g, ' ')
      }
    }
  })

  const handlePasteFromClipboard = useCallback(async () => {
    try {
      const text = await navigator.clipboard.readText()
      if (editor && text) editor.commands.insertContent(text)
    } catch { alert('Unable to access clipboard. Please paste manually using Ctrl+V.') }
  }, [editor])

  const handleUploadDocx = useCallback(async (e) => {
    const file = e.target.files?.[0]
    if (!file || !editor) return
    try {
      const arrayBuffer = await file.arrayBuffer()
      const result = await mammoth.convertToHtml({ arrayBuffer })
      editor.commands.insertContent(cleanWordHtml(result.value))
    } catch { alert('Failed to read DOCX file') }
    e.target.value = ''
  }, [editor])

  const handleInsertImage = useCallback(() => {
    if (!imageUrl.trim() || !editor) { setShowImageInput(false); return }
    const cleanUrl = imageUrl.trim()
    if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) { alert('Please enter a valid URL'); return }
    editor.chain().focus().setImage({ src: cleanUrl }).run()
    setImageUrl(''); setShowImageInput(false)
  }, [editor, imageUrl])

  const handleInsertLink = useCallback(() => {
    if (!linkUrl.trim() || !editor) { setShowLinkInput(false); return }
    const cleanUrl = linkUrl.trim()
    if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) { alert('Please enter a valid URL'); return }
    editor.chain().focus().setLink({ href: cleanUrl }).run()
    setLinkUrl(''); setShowLinkInput(false)
  }, [editor, linkUrl])

  const handleInsertYouTube = useCallback(() => {
    if (!youTubeUrl.trim() || !editor) { setShowYouTubeInput(false); return }
    const cleanUrl = youTubeUrl.trim()
    let embedUrl = cleanUrl
    const match = cleanUrl.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]+)/)
    if (match && match[1]) embedUrl = `https://www.youtube.com/embed/${match[1]}`
    editor.chain().focus().setParagraph({}).run()
    editor.commands.insertContent(`<iframe src="${embedUrl}" width="560" height="315" frameborder="0" allowfullscreen style="max-width:100%"></iframe>`)
    setYouTubeUrl(''); setShowYouTubeInput(false)
  }, [editor, youTubeUrl])

  const handlePaste = useCallback((view, event) => {
    if (!event?.clipboardData) return false
    const htmlData = event.clipboardData.getData('text/html')
    const textData = event.clipboardData.getData('text/plain')
    if (htmlData) { event.preventDefault(); editor?.commands.insertContent(cleanWordHtml(htmlData)); return true }
    if (textData) { event.preventDefault(); editor?.commands.insertContent(textData.replace(/\n/g, '<br>')); return true }
    return false
  }, [editor])

  if (!editor) return null

  const ToolButton = ({ onClick, active, disabled, children, title }) => (
    <button type="button" onClick={onClick} disabled={disabled} title={title}
      className={`p-2 rounded-lg transition-colors ${active ? 'bg-plum/10 text-plum' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>
      {children}
    </button>
  )

  const Separator = () => <div className="bg-gray-200 h-full mx-1" style={{ width: '1px' }} />

  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white">
      <div className="flex flex-wrap gap-1 p-3 border-b border-gray-100 bg-gray-50">
        <div className="flex items-center gap-1">
          <ToolButton title="Font Size"><Type size={16} /></ToolButton>
          <select className="text-sm border border-gray-300 rounded px-1 py-0.5 bg-white"
            value={editor.getAttributes('textStyle').fontSize || ''}
            onChange={(e) => { e.target.value === '' ? editor.chain().focus().unsetFontSize().run() : editor.chain().focus().setFontSize(e.target.value).run() }}>
            <option value="">Reset</option>
            <option value="9px">9px</option><option value="10px">10px</option><option value="11px">11px</option>
            <option value="12px">12px</option><option value="14px">14px</option><option value="16px">16px</option><option value="18px">18px</option>
          </select>
        </div>
        <Separator />
        <ToolButton onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')} title="Bold"><Bold size={16} /></ToolButton>
        <ToolButton onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')} title="Italic"><Italic size={16} /></ToolButton>
        <ToolButton onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive('underline')} title="Underline"><UnderlineIcon size={16} /></ToolButton>
        <ToolButton onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive('strike')} title="Strikethrough"><Strikethrough size={16} /></ToolButton>
        <ToolButton onClick={() => editor.chain().focus().toggleHighlight().run()} active={editor.isActive('highlight')} title="Highlight"><Highlighter size={16} /></ToolButton>
        <Separator />
        <ToolButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive('heading', { level: 1 })} title="H1"><Heading1 size={16} /></ToolButton>
        <ToolButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })} title="H2"><Heading2 size={16} /></ToolButton>
        <ToolButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive('heading', { level: 3 })} title="H3"><Heading3 size={16} /></ToolButton>
        <Separator />
        <ToolButton onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')} title="Bullet List"><List size={16} /></ToolButton>
        <ToolButton onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')} title="Ordered List"><ListOrdered size={16} /></ToolButton>
        <Separator />
        <ToolButton onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')} title="Blockquote"><Quote size={16} /></ToolButton>
        <ToolButton onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={editor.isActive('codeBlock')} title="Code Block"><Code size={16} /></ToolButton>
        <Separator />
        <ToolButton onClick={() => editor.chain().focus().setTextAlign('left').run()} active={editor.isActive({ textAlign: 'left' })} title="Left"><AlignLeft size={16} /></ToolButton>
        <ToolButton onClick={() => editor.chain().focus().setTextAlign('center').run()} active={editor.isActive({ textAlign: 'center' })} title="Center"><AlignCenter size={16} /></ToolButton>
        <ToolButton onClick={() => editor.chain().focus().setTextAlign('right').run()} active={editor.isActive({ textAlign: 'right' })} title="Right"><AlignRight size={16} /></ToolButton>
        <Separator />
        <div className="relative">
          <ToolButton onClick={() => setShowTableMenu(!showTableMenu)} active={editor.isActive('table')} title="Table"><TableIcon size={16} /></ToolButton>
          {showTableMenu && (
            <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded shadow-lg z-10 py-1 min-w-[180px]">
              <button type="button" className="w-full text-left px-3 py-1.5 text-sm hover:bg-gray-100 flex items-center gap-2" onClick={() => { editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run(); setShowTableMenu(false) }}><Plus size={14} /> Insert Table</button>
              <button type="button" className="w-full text-left px-3 py-1.5 text-sm hover:bg-gray-100 flex items-center gap-2" onClick={() => { editor.chain().focus().addColumnAfter().run(); setShowTableMenu(false) }}><Plus size={14} /> Add Column</button>
              <button type="button" className="w-full text-left px-3 py-1.5 text-sm hover:bg-gray-100 flex items-center gap-2" onClick={() => { editor.chain().focus().deleteColumn().run(); setShowTableMenu(false) }}><Trash2 size={14} /> Delete Column</button>
              <button type="button" className="w-full text-left px-3 py-1.5 text-sm hover:bg-gray-100 flex items-center gap-2" onClick={() => { editor.chain().focus().addRowAfter().run(); setShowTableMenu(false) }}><Plus size={14} /> Add Row</button>
              <button type="button" className="w-full text-left px-3 py-1.5 text-sm hover:bg-gray-100 flex items-center gap-2" onClick={() => { editor.chain().focus().deleteRow().run(); setShowTableMenu(false) }}><Trash2 size={14} /> Delete Row</button>
            </div>
          )}
        </div>
        <Separator />
        <ToolButton title="Upload .docx">
          <label className="cursor-pointer flex items-center"><Upload size={16} /><input type="file" accept=".docx" className="hidden" onChange={handleUploadDocx} /></label>
        </ToolButton>
        <ToolButton onClick={handlePasteFromClipboard} title="Paste from Clipboard"><Clipboard size={16} /></ToolButton>
        <Separator />
        <ToolButton onClick={() => setShowImageInput(!showImageInput)} active={showImageInput} title="Insert Image"><ImageIcon size={16} /></ToolButton>
        <ToolButton onClick={() => setShowLinkInput(!showLinkInput)} active={editor.isActive('link')} title="Insert Link"><LinkIcon size={16} /></ToolButton>
        <ToolButton onClick={() => setShowYouTubeInput(!showYouTubeInput)} active={showYouTubeInput} title="YouTube">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.13C5.12 19.56 12 19.56 12 19.56s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" /><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" /></svg>
        </ToolButton>
        <Separator />
        <ToolButton onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} title="Undo"><Undo size={16} /></ToolButton>
        <ToolButton onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} title="Redo"><Redo size={16} /></ToolButton>
      </div>

      {showLinkInput && (
        <div className="flex items-center gap-2 p-2 bg-gray-50 border-b border-gray-200">
          <input type="url" placeholder="Enter URL (https://...)" className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded" value={linkUrl} onChange={(e) => setLinkUrl(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleInsertLink(); if (e.key === 'Escape') { setShowLinkInput(false); setLinkUrl('') } }} autoFocus />
          <button type="button" onClick={handleInsertLink} className="px-3 py-1 text-sm bg-plum text-ivory rounded hover:bg-plum/90">Insert</button>
          <button type="button" onClick={() => { setShowLinkInput(false); setLinkUrl('') }} className="px-3 py-1 text-sm bg-gray-300 text-gray-700 rounded hover:bg-gray-400">Cancel</button>
        </div>
      )}
      {showImageInput && (
        <div className="flex items-center gap-2 p-2 bg-gray-50 border-b border-gray-200">
          <input type="url" placeholder="Enter image URL (https://...)" className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleInsertImage(); if (e.key === 'Escape') { setShowImageInput(false); setImageUrl('') } }} autoFocus />
          <button type="button" onClick={handleInsertImage} className="px-3 py-1 text-sm bg-plum text-ivory rounded hover:bg-plum/90">Insert</button>
          <button type="button" onClick={() => { setShowImageInput(false); setImageUrl('') }} className="px-3 py-1 text-sm bg-gray-300 text-gray-700 rounded hover:bg-gray-400">Cancel</button>
        </div>
      )}
      {showYouTubeInput && (
        <div className="flex items-center gap-2 p-2 bg-gray-50 border-b border-gray-200">
          <input type="url" placeholder="Enter YouTube URL (https://...)" className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded" value={youTubeUrl} onChange={(e) => setYouTubeUrl(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleInsertYouTube(); if (e.key === 'Escape') { setShowYouTubeInput(false); setYouTubeUrl('') } }} autoFocus />
          <button type="button" onClick={handleInsertYouTube} className="px-3 py-1 text-sm bg-plum text-ivory rounded hover:bg-plum/90">Insert</button>
          <button type="button" onClick={() => { setShowYouTubeInput(false); setYouTubeUrl('') }} className="px-3 py-1 text-sm bg-gray-300 text-gray-700 rounded hover:bg-gray-400">Cancel</button>
        </div>
      )}

      <div className="p-8 min-h-[600px]">
        <EditorContent editor={editor}
          className="prose prose-lg max-w-none focus:outline-none [&_.ProseEditor]:min-h-[580px] [&_.ProseEditor]:outline-none [&_table]:border-collapse [&_table]:w-full [&_td]:border [&_td]:border-gray-300 [&_td]:p-2 [&_th]:border [&_th]:border-gray-300 [&_th]:p-2 [&_th]:bg-gray-100 [&_img]:max-w-full [&_img]:h-auto [&_pre]:bg-gray-100 [&_pre]:p-3 [&_pre]:rounded [&_pre]:overflow-x-auto [&_code]:font-mono"
          onPaste={handlePaste} />
      </div>
    </div>
  )
}

export default RichTextEditor
