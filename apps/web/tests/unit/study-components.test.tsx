import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { AutosaveIndicator } from '@/features/studies/components/autosave-indicator';
import { VersionsPanel } from '@/features/studies/components/versions-panel';

describe('Study UI components', () => {
  it('renders autosave states', () => {
    expect(renderToStaticMarkup(<AutosaveIndicator status="saved" />)).toContain('Sauvegardé');
  });

  it('renders an empty versions panel', () => {
    expect(renderToStaticMarkup(<VersionsPanel versions={[]} />)).toContain('Aucune sauvegarde');
  });
});
