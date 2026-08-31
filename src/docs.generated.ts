import doc0 from './content/generated/introduction.md';
import doc1 from './content/generated/quick-start.md';
import doc2 from './content/generated/01-overview.md';
import doc3 from './content/generated/02-installation.md';
import doc4 from './content/generated/03-complete-artisan-command-catalog.md';
import doc5 from './content/generated/04-common-generator-arguments.md';
import doc6 from './content/generated/05-common-generator-options-exhaustive-reference.md';
import doc7 from './content/generated/06-interactive-field-syntax.md';
import doc8 from './content/generated/07-generated-architecture.md';
import doc9 from './content/generated/08-laravel-13-model-conventions.md';
import doc10 from './content/generated/09-api-behavior.md';
import doc11 from './content/generated/10-spatie-query-builder.md';
import doc12 from './content/generated/11-laravel-data-dtos.md';
import doc13 from './content/generated/12-permissions.md';
import doc14 from './content/generated/13-activitylog.md';
import doc15 from './content/generated/14-media-library.md';
import doc16 from './content/generated/15-laravel-scout.md';
import doc17 from './content/generated/16-laravel-excel.md';
import doc18 from './content/generated/17-queue-support.md';
import doc19 from './content/generated/18-reverb-broadcasting.md';
import doc20 from './content/generated/19-notifications.md';
import doc21 from './content/generated/20-swagger-openapi.md';
import doc22 from './content/generated/21-enterprise-preset.md';
import doc23 from './content/generated/22-configuration-reference.md';
import doc24 from './content/generated/23-reverse-generation-from-database.md';
import doc25 from './content/generated/24-repository-pattern-vs-direct-eloquent.md';
import doc26 from './content/generated/25-resources-and-collections.md';
import doc27 from './content/generated/26-enums.md';
import doc28 from './content/generated/27-tests.md';
import doc29 from './content/generated/28-schema-files.md';
import doc30 from './content/generated/29-typical-workflows.md';
import doc31 from './content/generated/30-windows-laragon-notes.md';
import doc32 from './content/generated/31-troubleshooting.md';
import doc33 from './content/generated/32-package-dependencies.md';
import doc34 from './content/generated/33-package-development-validation.md';
import doc35 from './content/generated/34-license-upstream-attribution.md';
import doc36 from './content/generated/35-native-scaffold-template-pack.md';
import doc37 from './content/generated/36-web-dashboard-kit.md';
import doc38 from './content/generated/37-web-authentication-kit-v0-9.md';
import doc39 from './content/generated/changelog.md';
import doc40 from './content/generated/license.md';

export type DocPage = {
  id: string;
  title: string;
  category: string;
  path: string;
  file: string;
  order: number;
  content: string;
};

export const docs: DocPage[] = [
  { ...{"id":"introduction","title":"Introduction","category":"Getting Started","path":"/docs/introduction","file":"introduction.md","order":0}, content: doc0 },
  { ...{"id":"quick-start","title":"Quick Start","category":"Getting Started","path":"/docs/quick-start","file":"quick-start.md","order":0.5}, content: doc1 },
  { ...{"id":"overview","title":"Overview","category":"Getting Started","path":"/docs/overview","file":"01-overview.md","order":1}, content: doc2 },
  { ...{"id":"installation","title":"Installation","category":"Getting Started","path":"/docs/installation","file":"02-installation.md","order":2}, content: doc3 },
  { ...{"id":"complete-artisan-command-catalog","title":"Complete Artisan command catalog","category":"Artisan Commands","path":"/docs/complete-artisan-command-catalog","file":"03-complete-artisan-command-catalog.md","order":3}, content: doc4 },
  { ...{"id":"common-generator-arguments","title":"Common generator arguments","category":"Core Generator","path":"/docs/common-generator-arguments","file":"04-common-generator-arguments.md","order":4}, content: doc5 },
  { ...{"id":"common-generator-options-exhaustive-reference","title":"Common generator options — exhaustive reference","category":"Core Generator","path":"/docs/common-generator-options-exhaustive-reference","file":"05-common-generator-options-exhaustive-reference.md","order":5}, content: doc6 },
  { ...{"id":"interactive-field-syntax","title":"Interactive field syntax","category":"Core Generator","path":"/docs/interactive-field-syntax","file":"06-interactive-field-syntax.md","order":6}, content: doc7 },
  { ...{"id":"generated-architecture","title":"Generated architecture","category":"Core Generator","path":"/docs/generated-architecture","file":"07-generated-architecture.md","order":7}, content: doc8 },
  { ...{"id":"laravel-13-model-conventions","title":"Laravel 13 model conventions","category":"Core Generator","path":"/docs/laravel-13-model-conventions","file":"08-laravel-13-model-conventions.md","order":8}, content: doc9 },
  { ...{"id":"api-behavior","title":"API behavior","category":"API & Security","path":"/docs/api-behavior","file":"09-api-behavior.md","order":9}, content: doc10 },
  { ...{"id":"spatie-query-builder","title":"Spatie Query Builder","category":"API & Security","path":"/docs/spatie-query-builder","file":"10-spatie-query-builder.md","order":10}, content: doc11 },
  { ...{"id":"laravel-data-dtos","title":"Laravel Data DTOs","category":"API & Security","path":"/docs/laravel-data-dtos","file":"11-laravel-data-dtos.md","order":11}, content: doc12 },
  { ...{"id":"permissions","title":"Permissions","category":"API & Security","path":"/docs/permissions","file":"12-permissions.md","order":12}, content: doc13 },
  { ...{"id":"activitylog","title":"Activitylog","category":"Features","path":"/docs/activitylog","file":"13-activitylog.md","order":13}, content: doc14 },
  { ...{"id":"media-library","title":"Media Library","category":"Features","path":"/docs/media-library","file":"14-media-library.md","order":14}, content: doc15 },
  { ...{"id":"laravel-scout","title":"Laravel Scout","category":"Features","path":"/docs/laravel-scout","file":"15-laravel-scout.md","order":15}, content: doc16 },
  { ...{"id":"laravel-excel","title":"Laravel Excel","category":"Features","path":"/docs/laravel-excel","file":"16-laravel-excel.md","order":16}, content: doc17 },
  { ...{"id":"queue-support","title":"Queue support","category":"Features","path":"/docs/queue-support","file":"17-queue-support.md","order":17}, content: doc18 },
  { ...{"id":"reverb-broadcasting","title":"Reverb / broadcasting","category":"Features","path":"/docs/reverb-broadcasting","file":"18-reverb-broadcasting.md","order":18}, content: doc19 },
  { ...{"id":"notifications","title":"Notifications","category":"Features","path":"/docs/notifications","file":"19-notifications.md","order":19}, content: doc20 },
  { ...{"id":"swagger-openapi","title":"Swagger / OpenAPI","category":"Swagger / OpenAPI","path":"/docs/swagger-openapi","file":"20-swagger-openapi.md","order":20}, content: doc21 },
  { ...{"id":"enterprise-preset","title":"Enterprise preset","category":"Configuration","path":"/docs/enterprise-preset","file":"21-enterprise-preset.md","order":21}, content: doc22 },
  { ...{"id":"configuration-reference","title":"Configuration reference","category":"Configuration","path":"/docs/configuration-reference","file":"22-configuration-reference.md","order":22}, content: doc23 },
  { ...{"id":"reverse-generation-from-database","title":"Reverse generation from database","category":"Advanced","path":"/docs/reverse-generation-from-database","file":"23-reverse-generation-from-database.md","order":23}, content: doc24 },
  { ...{"id":"repository-pattern-vs-direct-eloquent","title":"Repository Pattern vs direct Eloquent","category":"Advanced","path":"/docs/repository-pattern-vs-direct-eloquent","file":"24-repository-pattern-vs-direct-eloquent.md","order":24}, content: doc25 },
  { ...{"id":"resources-and-collections","title":"Resources and collections","category":"Advanced","path":"/docs/resources-and-collections","file":"25-resources-and-collections.md","order":25}, content: doc26 },
  { ...{"id":"enums","title":"Enums","category":"Advanced","path":"/docs/enums","file":"26-enums.md","order":26}, content: doc27 },
  { ...{"id":"tests","title":"Tests","category":"Advanced","path":"/docs/tests","file":"27-tests.md","order":27}, content: doc28 },
  { ...{"id":"schema-files","title":"Schema files","category":"Advanced","path":"/docs/schema-files","file":"28-schema-files.md","order":28}, content: doc29 },
  { ...{"id":"typical-workflows","title":"Typical workflows","category":"Advanced","path":"/docs/typical-workflows","file":"29-typical-workflows.md","order":29}, content: doc30 },
  { ...{"id":"windows-laragon-notes","title":"Windows / Laragon notes","category":"Operations","path":"/docs/windows-laragon-notes","file":"30-windows-laragon-notes.md","order":30}, content: doc31 },
  { ...{"id":"troubleshooting","title":"Troubleshooting","category":"Operations","path":"/docs/troubleshooting","file":"31-troubleshooting.md","order":31}, content: doc32 },
  { ...{"id":"package-dependencies","title":"Package dependencies","category":"Operations","path":"/docs/package-dependencies","file":"32-package-dependencies.md","order":32}, content: doc33 },
  { ...{"id":"package-development-validation","title":"Package development / validation","category":"Operations","path":"/docs/package-development-validation","file":"33-package-development-validation.md","order":33}, content: doc34 },
  { ...{"id":"license-upstream-attribution","title":"License / upstream attribution","category":"Project","path":"/docs/license-upstream-attribution","file":"34-license-upstream-attribution.md","order":34}, content: doc35 },
  { ...{"id":"native-scaffold-template-pack","title":"Native Scaffold Template Pack","category":"Web Scaffold","path":"/docs/native-scaffold-template-pack","file":"35-native-scaffold-template-pack.md","order":35}, content: doc36 },
  { ...{"id":"web-dashboard-kit","title":"Web Dashboard Kit","category":"Web Dashboard","path":"/docs/web-dashboard-kit","file":"36-web-dashboard-kit.md","order":36}, content: doc37 },
  { ...{"id":"web-authentication-kit-v0-9","title":"Web Authentication Kit (v0.9)","category":"Web Authentication","path":"/docs/web-authentication-kit-v0-9","file":"37-web-authentication-kit-v0-9.md","order":37}, content: doc38 },
  { ...{"id":"changelog","title":"Changelog","category":"Project","path":"/docs/changelog","file":"changelog.md","order":998}, content: doc39 },
  { ...{"id":"license","title":"License","category":"Project","path":"/docs/license","file":"license.md","order":999}, content: doc40 },
];

export const docCategories = Array.from(new Set(docs.map((doc) => doc.category)));
