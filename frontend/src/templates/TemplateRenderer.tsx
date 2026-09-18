import React, { Suspense, useEffect, useState } from 'react';
import type { WeddingData, TemplateData } from '../types';
import { getFile } from '../utils/indexedDb';
import MusicPlayer from '../components/MusicPlayer';

// Lazy load templates so we don't load all 100+ templates at once
const KeralaTraditional = React.lazy(() => import('./kerala-traditional/KeralaTraditional'));
const KeralaKasavu = React.lazy(() => import('./kerala-kasavu/KeralaKasavu'));
const RoyalIndian = React.lazy(() => import('./royal-indian/RoyalIndian'));
const MinimalLuxury = React.lazy(() => import('./minimal-luxury/MinimalLuxury'));
const Floral = React.lazy(() => import('./floral/Floral'));
const ChristianKerala = React.lazy(() => import('./christian-kerala/ChristianKerala'));
const MuslimKerala = React.lazy(() => import('./muslim-kerala/MuslimKerala'));
const HinduKerala = React.lazy(() => import('./hindu-kerala/HinduKerala'));
const ModernEditorial = React.lazy(() => import('./modern-editorial/ModernEditorial'));
const DarkLuxury = React.lazy(() => import('./dark-luxury/DarkLuxury'));

interface TemplateRendererProps {
  templateId: string;
  data: WeddingData;
}

export default function TemplateRenderer({ templateId, data }: TemplateRendererProps) {
  const [resolvedData, setResolvedData] = useState<TemplateData | null>(null);
  const [mediaError, setMediaError] = useState(false);

  useEffect(() => {
    let coupleUrl: string | undefined;
    let brideUrl: string | undefined;
    let groomUrl: string | undefined;

    const resolveMedia = async () => {
      try {
        if (data.couplePhotoUrl) {
          coupleUrl = data.couplePhotoUrl;
        } else if (data.couplePhotoId) {
          const file = await getFile(data.couplePhotoId);
          if (file) coupleUrl = URL.createObjectURL(file);
        }
        
        if (data.bridePhotoUrl) {
          brideUrl = data.bridePhotoUrl;
        } else if (data.bridePhotoId) {
          const file = await getFile(data.bridePhotoId);
          if (file) brideUrl = URL.createObjectURL(file);
        }
        
        if (data.groomPhotoUrl) {
          groomUrl = data.groomPhotoUrl;
        } else if (data.groomPhotoId) {
          const file = await getFile(data.groomPhotoId);
          if (file) groomUrl = URL.createObjectURL(file);
        }
      } catch (err) {
        console.error("Failed to load media:", err);
        setMediaError(true);
      }
      
      setResolvedData({
        ...data,
        couplePhotoUrl: coupleUrl,
        bridePhotoUrl: brideUrl,
        groomPhotoUrl: groomUrl
      });
    };

    resolveMedia();

    return () => {
      if (coupleUrl) URL.revokeObjectURL(coupleUrl);
      if (brideUrl) URL.revokeObjectURL(brideUrl);
      if (groomUrl) URL.revokeObjectURL(groomUrl);
    };
  }, [data]);

  const getTemplate = () => {
    if (!resolvedData) return null;
    
    switch (templateId) {
      case 'kerala-traditional':
        return <KeralaTraditional data={resolvedData} />;
      case 'kerala-kasavu':
        return <KeralaKasavu data={resolvedData} />;
      case 'royal-indian':
        return <RoyalIndian data={resolvedData} />;
      case 'minimal-luxury':
        return <MinimalLuxury data={resolvedData} />;
      case 'floral':
        return <Floral data={resolvedData} />;
      case 'christian-kerala':
        return <ChristianKerala data={resolvedData} />;
      case 'muslim-kerala':
        return <MuslimKerala data={resolvedData} />;
      case 'hindu-kerala':
        return <HinduKerala data={resolvedData} />;
      case 'modern-editorial':
        return <ModernEditorial data={resolvedData} />;
      case 'dark-luxury':
        return <DarkLuxury data={resolvedData} />;
      default:
        return <div className="p-8 text-center bg-white text-gray-800">Template not found</div>;
    }
  };

  return (
    <Suspense fallback={<div className="h-full w-full flex items-center justify-center bg-gray-50 text-gray-400">Loading template...</div>}>
      <div className="relative w-full h-full">
        {mediaError && (
          <div className="absolute top-4 inset-x-4 z-50 bg-red-500/90 text-white text-xs py-2 px-4 rounded-lg shadow-lg flex items-center justify-center backdrop-blur-sm">
            <span>Some invitation media could not be loaded.</span>
          </div>
        )}
        {getTemplate()}
        <MusicPlayer music={data.music} />
      </div>
    </Suspense>
  );
}
