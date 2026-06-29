'use client';

import { UploadCloud } from 'lucide-react';
import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';

const accept = '.pdf,.png,.jpg,.jpeg,.svg,application/pdf,image/png,image/jpeg,image/svg+xml';

export function FileUploader({ studyId, onUploaded }: { studyId: string; onUploaded: (url: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  async function upload(file: File) {
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    const response = await fetch(`/api/studies/${studyId}/upload`, { method: 'POST', body: formData });
    setUploading(false);
    if (!response.ok) return;
    const payload = (await response.json()) as { url: string };
    onUploaded(payload.url);
  }

  return <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-4"><input ref={inputRef} className="hidden" type="file" accept={accept} onChange={(event) => { const file = event.target.files?.[0]; if (file) void upload(file); }} /><Button variant="outline" onClick={() => inputRef.current?.click()} disabled={uploading}><UploadCloud className="mr-2 h-4 w-4" />{uploading ? 'Import...' : 'Importer PDF / image'}</Button><p className="mt-2 text-xs text-slate-500">Formats : PDF, PNG, JPG, JPEG, SVG. Taille maximale : 25 Mo.</p></div>;
}
