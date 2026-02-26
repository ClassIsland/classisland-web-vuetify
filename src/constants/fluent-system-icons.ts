import type { FluentIconName } from '@/types/fluent-icon';
import { icon, type IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faApple,
  faGithub,
  faLinux,
  faQq,
  faWindows
} from '@fortawesome/free-brands-svg-icons';

import homeRegular from '@fluentui/svg-icons/icons/home_24_regular.svg?raw';
import homeFilled from '@fluentui/svg-icons/icons/home_24_filled.svg?raw';
import arrowDownloadRegular from '@fluentui/svg-icons/icons/arrow_download_24_regular.svg?raw';
import arrowDownloadFilled from '@fluentui/svg-icons/icons/arrow_download_24_filled.svg?raw';
import navigationRegular from '@fluentui/svg-icons/icons/navigation_24_regular.svg?raw';
import navigationFilled from '@fluentui/svg-icons/icons/navigation_24_filled.svg?raw';
import arrowLeftRegular from '@fluentui/svg-icons/icons/arrow_left_24_regular.svg?raw';
import arrowLeftFilled from '@fluentui/svg-icons/icons/arrow_left_24_filled.svg?raw';
import bookOpenRegular from '@fluentui/svg-icons/icons/book_open_24_regular.svg?raw';
import bookOpenFilled from '@fluentui/svg-icons/icons/book_open_24_filled.svg?raw';
import mailRegular from '@fluentui/svg-icons/icons/mail_24_regular.svg?raw';
import mailFilled from '@fluentui/svg-icons/icons/mail_24_filled.svg?raw';
import chatRegular from '@fluentui/svg-icons/icons/chat_24_regular.svg?raw';
import chatFilled from '@fluentui/svg-icons/icons/chat_24_filled.svg?raw';
import chevronDownRegular from '@fluentui/svg-icons/icons/chevron_down_20_regular.svg?raw';
import chevronDownFilled from '@fluentui/svg-icons/icons/chevron_down_20_filled.svg?raw';
import checkmarkCircleRegular from '@fluentui/svg-icons/icons/checkmark_circle_24_regular.svg?raw';
import checkmarkCircleFilled from '@fluentui/svg-icons/icons/checkmark_circle_24_filled.svg?raw';
import warningRegular from '@fluentui/svg-icons/icons/warning_24_regular.svg?raw';
import warningFilled from '@fluentui/svg-icons/icons/warning_24_filled.svg?raw';
import dismissCircleRegular from '@fluentui/svg-icons/icons/dismiss_circle_24_regular.svg?raw';
import dismissCircleFilled from '@fluentui/svg-icons/icons/dismiss_circle_24_filled.svg?raw';
import dismissRegular from '@fluentui/svg-icons/icons/dismiss_24_regular.svg?raw';
import dismissFilled from '@fluentui/svg-icons/icons/dismiss_24_filled.svg?raw';
import infoRegular from '@fluentui/svg-icons/icons/info_24_regular.svg?raw';
import infoFilled from '@fluentui/svg-icons/icons/info_24_filled.svg?raw';
import boxRegular from '@fluentui/svg-icons/icons/box_24_regular.svg?raw';
import boxFilled from '@fluentui/svg-icons/icons/box_24_filled.svg?raw';
import documentCopyRegular from '@fluentui/svg-icons/icons/document_copy_20_regular.svg?raw';
import documentCopyFilled from '@fluentui/svg-icons/icons/document_copy_20_filled.svg?raw';
import videoRegular from '@fluentui/svg-icons/icons/video_24_regular.svg?raw';
import videoFilled from '@fluentui/svg-icons/icons/video_24_filled.svg?raw';
import questionCircleRegular from '@fluentui/svg-icons/icons/question_circle_24_regular.svg?raw';
import questionCircleFilled from '@fluentui/svg-icons/icons/question_circle_24_filled.svg?raw';
import settingsRegular from '@fluentui/svg-icons/icons/settings_24_regular.svg?raw';
import settingsFilled from '@fluentui/svg-icons/icons/settings_24_filled.svg?raw';
import arrowClockwiseRegular from '@fluentui/svg-icons/icons/arrow_clockwise_24_regular.svg?raw';
import arrowClockwiseFilled from '@fluentui/svg-icons/icons/arrow_clockwise_24_filled.svg?raw';
import archiveRegular from '@fluentui/svg-icons/icons/archive_24_regular.svg?raw';
import archiveFilled from '@fluentui/svg-icons/icons/archive_24_filled.svg?raw';
import personVoiceRegular from '@fluentui/svg-icons/icons/person_voice_24_regular.svg?raw';
import personVoiceFilled from '@fluentui/svg-icons/icons/person_voice_24_filled.svg?raw';
import briefcaseRegular from '@fluentui/svg-icons/icons/briefcase_24_regular.svg?raw';
import briefcaseFilled from '@fluentui/svg-icons/icons/briefcase_24_filled.svg?raw';
import clockRegular from '@fluentui/svg-icons/icons/clock_24_regular.svg?raw';
import clockFilled from '@fluentui/svg-icons/icons/clock_24_filled.svg?raw';
import documentEditRegular from '@fluentui/svg-icons/icons/document_edit_24_regular.svg?raw';
import documentEditFilled from '@fluentui/svg-icons/icons/document_edit_24_filled.svg?raw';
import arrowUploadRegular from '@fluentui/svg-icons/icons/arrow_upload_24_regular.svg?raw';
import arrowUploadFilled from '@fluentui/svg-icons/icons/arrow_upload_24_filled.svg?raw';
import peopleCommunityRegular from '@fluentui/svg-icons/icons/people_community_24_regular.svg?raw';
import peopleCommunityFilled from '@fluentui/svg-icons/icons/people_community_24_filled.svg?raw';
import layerRegular from '@fluentui/svg-icons/icons/layer_24_regular.svg?raw';
import layerFilled from '@fluentui/svg-icons/icons/layer_24_filled.svg?raw';
import lockClosedRegular from '@fluentui/svg-icons/icons/lock_closed_24_regular.svg?raw';
import lockClosedFilled from '@fluentui/svg-icons/icons/lock_closed_24_filled.svg?raw';
import tagMultipleRegular from '@fluentui/svg-icons/icons/tag_multiple_24_regular.svg?raw';
import tagMultipleFilled from '@fluentui/svg-icons/icons/tag_multiple_24_filled.svg?raw';
import speaker2Regular from '@fluentui/svg-icons/icons/speaker_2_24_regular.svg?raw';
import speaker2Filled from '@fluentui/svg-icons/icons/speaker_2_24_filled.svg?raw';
import speakerMuteRegular from '@fluentui/svg-icons/icons/speaker_mute_24_regular.svg?raw';
import speakerMuteFilled from '@fluentui/svg-icons/icons/speaker_mute_24_filled.svg?raw';
import codeTextRegular from '@fluentui/svg-icons/icons/code_text_20_regular.svg?raw';
import codeTextFilled from '@fluentui/svg-icons/icons/code_text_20_filled.svg?raw';
import alertBadgeRegular from '@fluentui/svg-icons/icons/alert_badge_24_regular.svg?raw';
import alertBadgeFilled from '@fluentui/svg-icons/icons/alert_badge_24_filled.svg?raw';
import documentSparkleRegular from '@fluentui/svg-icons/icons/document_sparkle_24_regular.svg?raw';
import documentSparkleFilled from '@fluentui/svg-icons/icons/document_sparkle_24_filled.svg?raw';

interface FluentSystemIconVariant {
  regular: string;
  filled?: string;
}

const brandIconSvg = (iconDefinition: IconDefinition) => icon(iconDefinition).html.join('');

export const FLUENT_ICON_FALLBACK_NAME: FluentIconName = 'questionCircle';

export const FLUENT_SYSTEM_ICONS: Record<FluentIconName, FluentSystemIconVariant> = {
  home: { regular: homeRegular, filled: homeFilled },
  arrowDownload: { regular: arrowDownloadRegular, filled: arrowDownloadFilled },
  github: { regular: brandIconSvg(faGithub) },
  navigation: { regular: navigationRegular, filled: navigationFilled },
  arrowLeft: { regular: arrowLeftRegular, filled: arrowLeftFilled },
  bookOpen: { regular: bookOpenRegular, filled: bookOpenFilled },
  mail: { regular: mailRegular, filled: mailFilled },
  qq: { regular: brandIconSvg(faQq) },
  chat: { regular: chatRegular, filled: chatFilled },
  chevronDown: { regular: chevronDownRegular, filled: chevronDownFilled },
  checkmarkCircle: { regular: checkmarkCircleRegular, filled: checkmarkCircleFilled },
  warning: { regular: warningRegular, filled: warningFilled },
  dismissCircle: { regular: dismissCircleRegular, filled: dismissCircleFilled },
  dismiss: { regular: dismissRegular, filled: dismissFilled },
  info: { regular: infoRegular, filled: infoFilled },
  box: { regular: boxRegular, filled: boxFilled },
  documentCopy: { regular: documentCopyRegular, filled: documentCopyFilled },
  video: { regular: videoRegular, filled: videoFilled },
  questionCircle: { regular: questionCircleRegular, filled: questionCircleFilled },
  windows: { regular: brandIconSvg(faWindows) },
  linux: { regular: brandIconSvg(faLinux) },
  macos: { regular: brandIconSvg(faApple) },
  settings: { regular: settingsRegular, filled: settingsFilled },
  arrowClockwise: { regular: arrowClockwiseRegular, filled: arrowClockwiseFilled },
  archive: { regular: archiveRegular, filled: archiveFilled },
  personVoice: { regular: personVoiceRegular, filled: personVoiceFilled },
  briefcase: { regular: briefcaseRegular, filled: briefcaseFilled },
  clock: { regular: clockRegular, filled: clockFilled },
  documentEdit: { regular: documentEditRegular, filled: documentEditFilled },
  arrowUpload: { regular: arrowUploadRegular, filled: arrowUploadFilled },
  peopleCommunity: { regular: peopleCommunityRegular, filled: peopleCommunityFilled },
  layer: { regular: layerRegular, filled: layerFilled },
  lockClosed: { regular: lockClosedRegular, filled: lockClosedFilled },
  tagMultiple: { regular: tagMultipleRegular, filled: tagMultipleFilled },
  speaker2: { regular: speaker2Regular, filled: speaker2Filled },
  speakerMute: { regular: speakerMuteRegular, filled: speakerMuteFilled },
  codeText: { regular: codeTextRegular, filled: codeTextFilled },
  alertBadge: { regular: alertBadgeRegular, filled: alertBadgeFilled },
  documentSparkle: { regular: documentSparkleRegular, filled: documentSparkleFilled }
};
