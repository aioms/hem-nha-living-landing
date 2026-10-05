import { Room, AmenitySpace } from '../types';
import { Language } from '../i18n/translations';
import { ROOM_TRANSLATIONS_EN } from '../i18n/roomTranslationsEn';
import { AMENITIES_TRANSLATIONS_EN } from '../i18n/amenitiesTranslationsEn';

/**
 * Returns a localized Room object.
 * If language is 'vi', returns the original room unmodified.
 * If language is 'en', substitutes English translations for story, concept, floor, bedType, capacity, leaseTerm, amenities, features, and image captions.
 */
export function getLocalizedRoom(room: Room | null | undefined, language: Language): Room | null {
  if (!room) return null;
  if (language === 'vi') return room;

  const translation = ROOM_TRANSLATIONS_EN[room.id];
  if (!translation) return room;

  return {
    ...room,
    concept: translation.concept || room.concept,
    story: translation.story || room.story,
    floor: translation.floor || room.floor,
    bedType: translation.bedType || room.bedType,
    capacity: translation.capacity || room.capacity,
    leaseTerm: translation.leaseTerm || room.leaseTerm,
    amenities: translation.amenities || room.amenities,
    features: {
      ...room.features,
      ...translation.features,
    },
    images: room.images.map((img, i) => ({
      ...img,
      caption: translation.captions && translation.captions[i] ? translation.captions[i] : img.caption,
    })),
  };
}

/**
 * Returns a localized AmenitySpace object.
 * If language is 'vi', returns the original amenity unmodified.
 * If language is 'en', substitutes English translations for name, tagline, description, hours, and features.
 */
export function getLocalizedAmenity(amenity: AmenitySpace, language: Language): AmenitySpace {
  if (language === 'vi') return amenity;

  const translation = AMENITIES_TRANSLATIONS_EN[amenity.id];
  if (!translation) return amenity;

  return {
    ...amenity,
    name: translation.name || amenity.name,
    tagline: translation.tagline || amenity.tagline,
    description: translation.description || amenity.description,
    hours: translation.hours || amenity.hours,
    features: translation.features || amenity.features,
  };
}
