/**
 * Canonical Dr. Jan Duffy photo assets for on-page E-E-A-T, schema, and favicons.
 * Live files are served from Cloudflare Images (`imagedelivery.net/<hash>/<id>/<variant>`).
 * Git copies under /public/images remain the backup if a hosted URL fails.
 */
import {
  AGENT_CLOUDFLARE_IMAGE_ID,
  withGitImageBackup,
} from '@/lib/config/cloudflare-images';

const AGENT_GIT_BACKUP = {
  src: '/images/dr-jan-duffy-800.png',
  srcNav: '/images/dr-jan-duffy-256.png',
  srcThumb: '/images/dr-jan-duffy-128.png',
  srcSchema: '/images/dr-jan-duffy-512.png',
} as const;

const HOMEPAGE_OG_GIT = '/images/og-home.jpg';
export const HOMEPAGE_OG_CLOUDFLARE_IMAGE_ID = 'maravilla/og-home';

/** 1200×630 homepage share card for og:image and twitter:image (summary_large_image). */
export const HOMEPAGE_OG_IMAGE = {
  get src() {
    return withGitImageBackup(
      HOMEPAGE_OG_CLOUDFLARE_IMAGE_ID,
      'og',
      HOMEPAGE_OG_GIT
    );
  },
  alt: 'Search North Las Vegas homes in Maravilla with Dr. Jan Duffy, REALTOR®. Call (702) 500-1953.',
  width: 1200,
  height: 630,
} as const;

export const AGENT_PHOTO = {
  get src() {
    return withGitImageBackup(
      AGENT_CLOUDFLARE_IMAGE_ID,
      'portrait',
      AGENT_GIT_BACKUP.src
    );
  },
  get srcNav() {
    return withGitImageBackup(
      AGENT_CLOUDFLARE_IMAGE_ID,
      'nav',
      AGENT_GIT_BACKUP.srcNav
    );
  },
  get srcThumb() {
    return withGitImageBackup(
      AGENT_CLOUDFLARE_IMAGE_ID,
      'thumbnail',
      AGENT_GIT_BACKUP.srcThumb
    );
  },
  get srcSchema() {
    return withGitImageBackup(
      AGENT_CLOUDFLARE_IMAGE_ID,
      'schema',
      AGENT_GIT_BACKUP.srcSchema
    );
  },
  alt: 'Dr. Jan Duffy, REALTOR® with Berkshire Hathaway HomeServices Nevada Properties, North Las Vegas',
  width: 800,
  height: 800,
} as const;

export const AGENT_NAME = 'Dr. Jan Duffy';
export const AGENT_JOB_TITLE = 'REALTOR®';
export const AGENT_LICENSE = 'S.0197614.LLC';
