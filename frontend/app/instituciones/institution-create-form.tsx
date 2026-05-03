'use client';

import { useEffect, useState } from 'react';
import { ModalShell } from '../../components/modal-shell';
import { getDemoAccessToken } from '../lib/demo-api';

type FormState = {
  success: boolean;
  message: string | null;
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:4100/api';

export type InstitutionFormValues = {
  id?: string;
  name: string;
  slug: string;
  institutionType: 'publica' | 'privada';
  contactEmail?: string;
  contactPhone?: string;
  address?: string;
  activeSchoolYearLabel?: string;
};

type InstitutionFormModalProps = {
  open: boolean;
  mode: 'create' | 'edit';
  onClose: () => void;
  initialValues?: InstitutionFormValues;
};

export function InstitutionFormModal({ open, mode, onClose, initialValues }: InstitutionFormModalProps) {
  const [pending, setPending] = useState(false);
  const [state, setState] = useState<FormState>({ success: false, message: null });

  useEffect(() => {
    if (open) {
      setPending(false);
      setState({ success: false, message: null });
    }
  }, [open, mode, initialValues]);

  async function handleSubmit(formData: FormData) {
    setPending(true);
    setState({ success: false, message: null });

    if (mode === 'edit') {
      setState({ success: false, message: 'La edición quedará habilitada cuando la API exponga actualización de instituciones.' });
      setPending(false);
      return;
    }

    const payload = {
      name: String(formData.get('name') ?? '').trim(),
      slug: String(formData.get('slug') ?? '').trim(),
      institutionType: String(formData.get('institutionType') ?? '').trim(),
      contactEmail: String(formData.get('contactEmail') ?? '').trim(),
      contactPhone: String(formData.get('contactPhone') ?? '').trim(),
      address: String(formData.get('address') ?? '').trim(),
      activeSchoolYearLabel: String(formData.get('activeSchoolYearLabel') ?? '').trim(),
    };

    if (!payload.name || !payload.slug || !payload.institutionType) {
      setState({ success: false, message: 'Nombre, slug y tipo son obligatorios.' });
      setPending(false);
      return;
    }

    try {
      const accessToken = await getDemoAccessToken();
      const response = await fetch(`${API_BASE_URL}/institutions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload),
      });

      const responsePayload = await response.json().catch(() => null) as { message?: string } | null;

      if (!response.ok) {
        throw new Error(responsePayload?.message ?? 'No fue posible crear la institución.');
      }

      setState({ success: true, message: 'Institución creada correctamente.' });
      window.location.reload();
    } catch (error) {
      setState({ success: false, message: error instanceof Error ? error.message : 'No fue posible crear la institución.' });
    } finally {
      setPending(false);
    }
  }

  return (
    <ModalShell
      open={open}
      onClose={onClose}
      title={mode === 'create' ? 'Registrar institución' : 'Editar institución'}
      description={mode === 'create'
        ? 'Completa los datos principales para crear una institución real en la API protegida y verla de inmediato en el registro actual.'
        : 'La interfaz de edición ya quedó preparada dentro del modal para activarse apenas exista actualización de instituciones en la API.'}
    >
      <form action={handleSubmit} className="space-y-5">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Nombre</span>
            <input name="name" required minLength={3} maxLength={180} defaultValue={initialValues?.name ?? ''} className="form-field" placeholder="Unidad Educativa Nueva Esperanza" />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Slug</span>
            <input name="slug" required minLength={3} maxLength={120} defaultValue={initialValues?.slug ?? ''} className="form-field" placeholder="unidad-educativa-nueva-esperanza" />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Tipo</span>
            <select name="institutionType" required defaultValue={initialValues?.institutionType ?? 'privada'} className="form-field">
              <option value="privada">Privada</option>
              <option value="publica">Pública</option>
            </select>
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Correo de contacto</span>
            <input name="contactEmail" type="email" defaultValue={initialValues?.contactEmail ?? ''} className="form-field" placeholder="rectorado@institucion.edu" />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Teléfono</span>
            <input name="contactPhone" defaultValue={initialValues?.contactPhone ?? ''} className="form-field" placeholder="+593999999999" />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Año lectivo activo</span>
            <input name="activeSchoolYearLabel" defaultValue={initialValues?.activeSchoolYearLabel ?? ''} className="form-field" placeholder="2026-2027" />
          </label>
        </div>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">Dirección</span>
          <textarea name="address" rows={3} defaultValue={initialValues?.address ?? ''} className="form-field" placeholder="Ciudad, sector y referencia principal" />
        </label>

        {mode === 'edit' ? (
          <p className="text-sm text-slate-500">
            Los datos se muestran listos para edición. La acción de guardar se activará cuando exista soporte de actualización en backend.
          </p>
        ) : null}

        {state.message ? <p className={`text-sm ${state.success ? 'status-good' : 'status-bad'}`}>{state.message}</p> : null}

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button type="button" onClick={onClose} className="secondary-button">
            Cancelar
          </button>
          <button type="submit" disabled={pending} className="primary-button disabled:cursor-not-allowed disabled:opacity-60">
            {mode === 'create'
              ? pending ? 'Creando institución...' : 'Crear institución'
              : pending ? 'Preparando edición...' : 'Guardar cambios'}
          </button>
        </div>
      </form>
    </ModalShell>
  );
}
