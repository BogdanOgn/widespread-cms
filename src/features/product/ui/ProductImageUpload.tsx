import { useRef } from 'react';
import { IoClose } from 'react-icons/io5';
import { MdDragIndicator } from 'react-icons/md';
import {
	DndContext,
	closestCenter,
	PointerSensor,
	useSensor,
	useSensors,
	type DragEndEvent,
} from '@dnd-kit/core';
import {
	SortableContext,
	arrayMove,
	rectSortingStrategy,
	useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { type PendingImage } from '@/entities/image';

import { API_URL } from '@/shared/config';
import { useUploadImage } from '@/shared/lib';
import { Button, Spinner } from '@/shared/ui';

interface SortableImageProps {
	img: PendingImage;
	onRemove: (localId: string | number) => void;
}

const SortableImage = ({ img, onRemove }: SortableImageProps) => {
	const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
		id: img.localId,
	});

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		opacity: isDragging ? 0.4 : 1,
		zIndex: isDragging ? 10 : undefined,
	};

	return (
		<div ref={setNodeRef} style={style} className='relative aspect-square'>
			<img
				src={img.url ? `${API_URL}${img.url}` : 'nophoto.png'}
				alt={img.alt}
				className='h-full w-full rounded-lg object-cover'
			/>
			<button
				type='button'
				{...attributes}
				{...listeners}
				className='absolute top-1 left-1 flex h-6 w-6 cursor-grab items-center justify-center rounded bg-black/60 text-white active:cursor-grabbing'
			>
				<MdDragIndicator />
			</button>
			<Button
				type='button'
				variant='unstyled'
				onClick={() => onRemove(img.localId)}
				className='absolute top-1 right-1 h-6 w-6 bg-black/60 p-0 text-white hover:bg-black/80'
			>
				<IoClose />
			</Button>
		</div>
	);
};

interface Props {
	images: PendingImage[];
	onChange: (images: PendingImage[]) => void;
}

export const ProductImageUpload = ({ images, onChange }: Props) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const { mutateAsync: upload, isPending } = useUploadImage();

	const sensors = useSensors(
		useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
	);

	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = Array.from(e.target.files ?? []);
		if (!files.length) return;

		const results = await Promise.all(
			files.map(async file => {
				const { url } = await upload(file);
				return { url, alt: '', localId: crypto.randomUUID() } satisfies PendingImage;
			})
		);

		onChange([...images, ...results]);
		e.target.value = '';
	};

	const handleRemove = (localId: string | number) => {
		onChange(images.filter(img => img.localId !== localId));
	};

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;
		if (!over || active.id === over.id) return;

		const oldIndex = images.findIndex(img => img.localId === active.id);
		const newIndex = images.findIndex(img => img.localId === over.id);
		onChange(arrayMove(images, oldIndex, newIndex));
	};

	return (
		<div className='flex flex-col gap-3'>
			<input
				ref={inputRef}
				type='file'
				accept='image/*'
				multiple
				className='hidden'
				onChange={handleFileChange}
			/>
			<Button
				type='button'
				onClick={() => inputRef.current?.click()}
				disabled={isPending}
				className='w-full'
			>
				{isPending ? <Spinner /> : 'Add photos'}
			</Button>
			{images.length > 0 && (
				<DndContext
					sensors={sensors}
					collisionDetection={closestCenter}
					onDragEnd={handleDragEnd}
				>
					<SortableContext
						items={images.map(img => img.localId)}
						strategy={rectSortingStrategy}
					>
						<div className='grid grid-cols-3 gap-2'>
							{images.map(img => (
								<SortableImage key={img.localId} img={img} onRemove={handleRemove} />
							))}
						</div>
					</SortableContext>
				</DndContext>
			)}
		</div>
	);
};
