# Module Étude

## Architecture

Le module Étude suit une architecture Feature First dans `apps/web/features/studies` :

- `domain` : contrats repository et schémas Zod.
- `application` : services métier (`StudyService`, `StorageService`, `AutosaveService`, `StudyUploadService`).
- `infrastructure` : implémentation Prisma du repository et composition des services.
- `components` : éditeur, canvas, toolbar, panels, uploader et indicateur d’autosave.
- `hooks` : hook dédié à la sauvegarde automatique.
- `store` : store Zustand séparant UI state, canvas state, selection state et history state.

## Flux utilisateur

1. L’utilisateur ouvre un projet puis le module Étude.
2. L’éditeur charge l’étude et ses relations : fichiers, calques et versions.
3. L’utilisateur importe un PDF, PNG, JPG, JPEG ou SVG.
4. Le fichier est validé, stocké et rattaché à l’étude.
5. Le canvas permet zoom, pan, fit screen, reset zoom et plein écran.
6. Toutes les 30 secondes, le hook d’autosave envoie un snapshot au endpoint dédié.

## Composants

- `StudyEditor` : layout complet de l’éditeur.
- `StudyCanvas` : zone React Konva pour afficher le plan et manipuler la vue.
- `Toolbar` : commandes zoom, pan, fit screen, reset et plein écran.
- `PropertiesPanel` : propriétés de l’étude et sélection courante.
- `LayersPanel` : fondation de gestion des calques.
- `VersionsPanel` : versions créées par autosave.
- `FileUploader` : import des fichiers acceptés.
- `AutosaveIndicator` : état de sauvegarde.

## API

- `GET /api/studies` : liste des études, filtrable par `projectId`.
- `POST /api/studies` : création d’une étude.
- `GET /api/studies/:id` : détail d’une étude.
- `PATCH /api/studies/:id` : mise à jour partielle.
- `DELETE /api/studies/:id` : suppression.
- `POST /api/studies/:id/upload` : import de fichier.
- `POST /api/studies/:id/autosave` : sauvegarde automatique d’un snapshot canvas.

## Limites volontaires

Les équipements et annotations ne sont pas développés dans ce sprint. Les calques, versions et snapshots sont les fondations nécessaires pour les prochains modules.
