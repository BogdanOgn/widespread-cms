import { EditorContent, useEditor, useEditorState } from '@tiptap/react';
import { useEffect } from 'react';
import type { FieldError } from 'react-hook-form';
import { BsTypeH1, BsTypeH2, BsTypeH3 } from 'react-icons/bs';
import {
	MdFormatBold,
	MdFormatItalic,
	MdFormatListBulleted,
	MdFormatListNumbered,
	MdFormatStrikethrough
} from 'react-icons/md';

import { twMerge } from 'tailwind-merge';

import { Button } from '../button';
import { Typography } from '../typography';

import StarterKit from '@tiptap/starter-kit';

type ToolbarButtonProps = {
	onClick: () => void;
	isActive?: boolean;
	children: React.ReactNode;
};

const ToolbarButton = ({ onClick, isActive, children }: ToolbarButtonProps) => (
	<Button
		type='button'
		variant='unstyled'
		onClick={onClick}
		className={
			isActive ? 'bg-accent text-white' : 'text-text-gray hover:bg-surface hover:text-text'
		}
	>
		{children}
	</Button>
);

type RichTextEditorProps = {
	value?: string;
	onChange?: (value: string) => void;
	onBlur?: () => void;
	hint?: string;
	error?: FieldError;
};

export const RichTextEditor = ({ value, onChange, onBlur, hint, error }: RichTextEditorProps) => {
	const editor = useEditor({
		extensions: [StarterKit],
		content: value || '',
		onUpdate: ({ editor }) => {
			const html = editor.getHTML();
			onChange?.(html === '<p></p>' ? '' : html);
		},
		onBlur: () => onBlur?.(),
		editorProps: {
			attributes: {
				class: 'rte-content outline-none min-h-32 px-4 py-3'
			}
		}
	});

	const {
		isHeading1,
		isHeading2,
		isHeading3,
		isBold,
		isItalic,
		isStrike,
		isBulletList,
		isOrderedList
	} = useEditorState({
		editor,
		selector: ctx => ({
			isBold: ctx.editor?.isActive('bold') ?? false,
			isItalic: ctx.editor?.isActive('italic') ?? false,
			isStrike: ctx.editor?.isActive('strike') ?? false,
			isBulletList: ctx.editor?.isActive('bulletList') ?? false,
			isOrderedList: ctx.editor?.isActive('orderedList') ?? false,
			isHeading1: ctx.editor.isActive('heading', { level: 1 }) ?? false,
			isHeading2: ctx.editor.isActive('heading', { level: 2 }) ?? false,
			isHeading3: ctx.editor.isActive('heading', { level: 3 }) ?? false
		})
	});

	useEffect(() => {
		if (!editor) return;
		const current = editor.getHTML();
		const isEmpty = current === '<p></p>';
		if (value !== current && !(value === '' && isEmpty)) {
			editor.commands.setContent(value || '');
		}
	}, [value, editor]);

	return (
		<div className='flex w-full flex-col gap-1.5'>
			{hint && (
				<Typography variant='caption' as='p'>
					{hint}
				</Typography>
			)}
			<div
				className={twMerge(
					'bg-background shadow-primary w-full rounded-lg border',
					error ? 'border-error' : 'border-transparent'
				)}
			>
				<div className='flex flex-wrap items-center gap-0.5 border-b border-gray-700/50 px-2 py-1.5'>
					<ToolbarButton
						onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
						isActive={isHeading1}
					>
						<BsTypeH1 size={18} />
					</ToolbarButton>
					<ToolbarButton
						onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
						isActive={isHeading2}
					>
						<BsTypeH2 size={18} />
					</ToolbarButton>
					<ToolbarButton
						onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
						isActive={isHeading3}
					>
						<BsTypeH3 size={18} />
					</ToolbarButton>
					<ToolbarButton
						onClick={() => editor?.chain().focus().toggleBold().run()}
						isActive={isBold}
					>
						<MdFormatBold size={18} />
					</ToolbarButton>
					<ToolbarButton
						onClick={() => editor?.chain().focus().toggleItalic().run()}
						isActive={isItalic}
					>
						<MdFormatItalic size={18} />
					</ToolbarButton>
					<ToolbarButton
						onClick={() => editor?.chain().focus().toggleStrike().run()}
						isActive={isStrike}
					>
						<MdFormatStrikethrough size={18} />
					</ToolbarButton>
					<div className='mx-1 h-5 w-px bg-gray-600' />
					<ToolbarButton
						onClick={() => editor?.chain().focus().toggleBulletList().run()}
						isActive={isBulletList}
					>
						<MdFormatListBulleted size={18} />
					</ToolbarButton>
					<ToolbarButton
						onClick={() => editor?.chain().focus().toggleOrderedList().run()}
						isActive={isOrderedList}
					>
						<MdFormatListNumbered size={18} />
					</ToolbarButton>
				</div>
				<EditorContent editor={editor} />
			</div>
			{error?.message && (
				<Typography variant='error' as='small'>
					{error.message}
				</Typography>
			)}
		</div>
	);
};
