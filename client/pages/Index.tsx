import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  CheckCircle,
  Building2,
  Factory,
  Utensils,
  Shield,
  Phone,
  ArrowRight,
  Star,
  Quote,
  Calendar,
  ClipboardCheck,
  Brush,
  CheckSquare,
  Eye,
  Play,
  Pause,
  Home
} from 'lucide-react';
import Lenis from 'lenis';
import { parseInstagramEmbedCode, InstagramReelData } from '@/utils/instagramParser';

export default function Index() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeStep, setActiveStep] = useState(0);


  const heroImages = [
    {
      url: "https://sk-services.s3.ap-southeast-2.amazonaws.com/SK-cleaning-images+/HERO+1+(2).PNG",
      alt: "Professional office cleaning team"
    },
    {
      url: "https://sk-services.s3.ap-southeast-2.amazonaws.com/SK-cleaning-images+/HERO+1.png",
      alt: "Restaurant deep cleaning service"
    },
    {
      url: "https://sk-services.s3.ap-southeast-2.amazonaws.com/SK-cleaning-images+/HERO+3.png",
      alt: "Industrial facility cleaning"
    },

    {
      url: "https://sk-services.s3.ap-southeast-2.amazonaws.com/SK-cleaning-images+/HERO+2.png ",
      alt: "Commercial space cleaning"
    }

  ];



  const instagramReels = [
    {
      id: 1,
      title: "TATA Factory Cleaning ",
      // description: "Watch how we transformed this corporate office in Hinjewadi",
      thumbnail: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=400&fit=crop&crop=center",
      videoThumbnail: "https://sk-services.s3.ap-southeast-2.amazonaws.com/reels/reel1.mp4",
      embedCode: `<blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="https://www.instagram.com/reel/DMrafiiomwf/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"><div style="padding:16px;"> <a href="https://www.instagram.com/reel/DMrafiiomwf/?utm_source=ig_embed&amp;utm_campaign=loading" style=" background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%;" target="_blank"> <div style=" display: flex; flex-direction: row; align-items: center;"> <div style="background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 40px; margin-right: 14px; width: 40px;"></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 100px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 60px;"></div></div></div><div style="padding: 19% 0;"></div> <div style="display:block; height:50px; margin:0 auto 12px; width:50px;"><svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-511.000000, -20.000000)" fill="#000000"><g><path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"></path></g></g></g></svg></div><div style="padding-top: 8px;"> <div style=" color:#3897f0; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:550; line-height:18px;">View this post on Instagram</div></div><div style="padding: 12.5% 0;"></div> <div style="display: flex; flex-direction: row; margin-bottom: 14px; align-items: center;"><div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(0px) translateY(7px);"></div> <div style="background-color: #F4F4F4; height: 12.5px; transform: rotate(-45deg) translateX(3px) translateY(1px); width: 12.5px; flex-grow: 0; margin-right: 14px; margin-left: 2px;"></div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(9px) translateY(-18px);"></div></div><div style="margin-left: 8px;"> <div style=" background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 20px; width: 20px;"></div> <div style=" width: 0; height: 0; border-top: 2px solid transparent; border-left: 6px solid #f4f4f4; border-bottom: 2px solid transparent; transform: translateX(16px) translateY(-4px) rotate(30deg)"></div></div><div style="margin-left: auto;"> <div style=" width: 0px; border-top: 8px solid #F4F4F4; border-right: 8px solid transparent; transform: translateY(16px);"></div> <div style=" background-color: #F4F4F4; flex-grow: 0; height: 12px; width: 16px; transform: translateY(-4px);"></div> <div style=" width: 0; height: 0; border-top: 8px solid #F4F4F4; border-left: 8px solid transparent; transform: translateY(-4px) translateX(8px);"></div></div></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center; margin-bottom: 24px;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 224px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 144px;"></div></div></a><p style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;"><a href="https://www.instagram.com/reel/DMrafiiomwf/?utm_source=ig_embed&amp;utm_campaign=loading" style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none;" target="_blank">A post shared by SEVA MANTRA (@sk_servicespune)</a></p></div></blockquote>
<script async src="//www.instagram.com/embed.js"></script>`,

    },
    {
      id: 2,
      title: "Residential cleaning",
      // description: "Complete kitchen deep cleaning process at Spice Garden",
      thumbnail: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop&crop=center",
      videoThumbnail: "https://sk-services.s3.ap-southeast-2.amazonaws.com/reels/reel2.mp4",
      embedCode: `<blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="https://www.instagram.com/reel/DLhlvvstI67/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"><div style="padding:16px;"> <a href="https://www.instagram.com/reel/DLhlvvstI67/?utm_source=ig_embed&amp;utm_campaign=loading" style=" background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%;" target="_blank"> <div style=" display: flex; flex-direction: row; align-items: center;"> <div style="background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 40px; margin-right: 14px; width: 40px;"></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 100px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 60px;"></div></div></div><div style="padding: 19% 0;"></div> <div style="display:block; height:50px; margin:0 auto 12px; width:50px;"><svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-511.000000, -20.000000)" fill="#000000"><g><path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"></path></g></g></g></svg></div><div style="padding-top: 8px;"> <div style=" color:#3897f0; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:550; line-height:18px;">View this post on Instagram</div></div><div style="padding: 12.5% 0;"></div> <div style="display: flex; flex-direction: row; margin-bottom: 14px; align-items: center;"><div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(0px) translateY(7px);"></div> <div style="background-color: #F4F4F4; height: 12.5px; transform: rotate(-45deg) translateX(3px) translateY(1px); width: 12.5px; flex-grow: 0; margin-right: 14px; margin-left: 2px;"></div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(9px) translateY(-18px);"></div></div><div style="margin-left: 8px;"> <div style=" background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 20px; width: 20px;"></div> <div style=" width: 0; height: 0; border-top: 2px solid transparent; border-left: 6px solid #f4f4f4; border-bottom: 2px solid transparent; transform: translateX(16px) translateY(-4px) rotate(30deg)"></div></div><div style="margin-left: auto;"> <div style=" width: 0px; border-top: 8px solid #F4F4F4; border-right: 8px solid transparent; transform: translateY(16px);"></div> <div style=" background-color: #F4F4F4; flex-grow: 0; height: 12px; width: 16px; transform: translateY(-4px);"></div> <div style=" width: 0; height: 0; border-top: 8px solid #F4F4F4; border-left: 8px solid transparent; transform: translateY(-4px) translateX(8px);"></div></div></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center; margin-bottom: 24px;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 224px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 144px;"></div></div></a><p style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;"><a href="https://www.instagram.com/reel/DLhlvvstI67/?utm_source=ig_embed&amp;utm_campaign=loading" style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none;" target="_blank">A post shared by SEVA MANTRA (@sk_servicespune)</a></p></div></blockquote>
<script async src="//www.instagram.com/embed.js"></script>`,
    },
    {
      id: 3,
      title: "Restaurant cleaning",
      // description: "Heavy machinery cleaning at manufacturing unit",
      thumbnail: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=400&h=400&fit=crop&crop=center",
      videoThumbnail: "https://sk-services.s3.ap-southeast-2.amazonaws.com/reels/reel3.mp4",
      embedCode: `<blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="https://www.instagram.com/reel/DH5cS1-NnaR/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"><div style="padding:16px;"> <a href="https://www.instagram.com/reel/DH5cS1-NnaR/?utm_source=ig_embed&amp;utm_campaign=loading" style=" background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%;" target="_blank"> <div style=" display: flex; flex-direction: row; align-items: center;"> <div style="background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 40px; margin-right: 14px; width: 40px;"></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 100px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 60px;"></div></div></div><div style="padding: 19% 0;"></div> <div style="display:block; height:50px; margin:0 auto 12px; width:50px;"><svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-511.000000, -20.000000)" fill="#000000"><g><path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"></path></g></g></g></svg></div><div style="padding-top: 8px;"> <div style=" color:#3897f0; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:550; line-height:18px;">View this post on Instagram</div></div><div style="padding: 12.5% 0;"></div> <div style="display: flex; flex-direction: row; margin-bottom: 14px; align-items: center;"><div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(0px) translateY(7px);"></div> <div style="background-color: #F4F4F4; height: 12.5px; transform: rotate(-45deg) translateX(3px) translateY(1px); width: 12.5px; flex-grow: 0; margin-right: 14px; margin-left: 2px;"></div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(9px) translateY(-18px);"></div></div><div style="margin-left: 8px;"> <div style=" background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 20px; width: 20px;"></div> <div style=" width: 0; height: 0; border-top: 2px solid transparent; border-left: 6px solid #f4f4f4; border-bottom: 2px solid transparent; transform: translateX(16px) translateY(-4px) rotate(30deg)"></div></div><div style="margin-left: auto;"> <div style=" width: 0px; border-top: 8px solid #F4F4F4; border-right: 8px solid transparent; transform: translateY(16px);"></div> <div style=" background-color: #F4F4F4; flex-grow: 0; height: 12px; width: 16px; transform: translateY(-4px);"></div> <div style=" width: 0; height: 0; border-top: 8px solid #F4F4F4; border-left: 8px solid transparent; transform: translateY(-4px) translateX(8px);"></div></div></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center; margin-bottom: 24px;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 224px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 144px;"></div></div></a><p style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;"><a href="https://www.instagram.com/reel/DH5cS1-NnaR/?utm_source=ig_embed&amp;utm_campaign=loading" style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none;" target="_blank">A post shared by SEVA MANTRA (@sk_servicespune)</a></p></div></blockquote>
<script async src="//www.instagram.com/embed.js"></script>`,

    },
    {
      id: 4,
      title: "Office cleaning",
      // description: "Amazing transformation of coffee-stained office carpet",
      thumbnail: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop&crop=center",
      videoThumbnail: "https://sk-services.s3.ap-southeast-2.amazonaws.com/reels/reel4.mp4",
      embedCode: `<blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="https://www.instagram.com/reel/DF6-GG9NtZo/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"><div style="padding:16px;"> <a href="https://www.instagram.com/reel/DF6-GG9NtZo/?utm_source=ig_embed&amp;utm_campaign=loading" style=" background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%;" target="_blank"> <div style=" display: flex; flex-direction: row; align-items: center;"> <div style="background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 40px; margin-right: 14px; width: 40px;"></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 100px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 60px;"></div></div></div><div style="padding: 19% 0;"></div> <div style="display:block; height:50px; margin:0 auto 12px; width:50px;"><svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-511.000000, -20.000000)" fill="#000000"><g><path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"></path></g></g></g></svg></div><div style="padding-top: 8px;"> <div style=" color:#3897f0; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:550; line-height:18px;">View this post on Instagram</div></div><div style="padding: 12.5% 0;"></div> <div style="display: flex; flex-direction: row; margin-bottom: 14px; align-items: center;"><div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(0px) translateY(7px);"></div> <div style="background-color: #F4F4F4; height: 12.5px; transform: rotate(-45deg) translateX(3px) translateY(1px); width: 12.5px; flex-grow: 0; margin-right: 14px; margin-left: 2px;"></div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(9px) translateY(-18px);"></div></div><div style="margin-left: 8px;"> <div style=" background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 20px; width: 20px;"></div> <div style=" width: 0; height: 0; border-top: 2px solid transparent; border-left: 6px solid #f4f4f4; border-bottom: 2px solid transparent; transform: translateX(16px) translateY(-4px) rotate(30deg)"></div></div><div style="margin-left: auto;"> <div style=" width: 0px; border-top: 8px solid #F4F4F4; border-right: 8px solid transparent; transform: translateY(16px);"></div> <div style=" background-color: #F4F4F4; flex-grow: 0; height: 12px; width: 16px; transform: translateY(-4px);"></div> <div style=" width: 0; height: 0; border-top: 8px solid #F4F4F4; border-left: 8px solid transparent; transform: translateY(-4px) translateX(8px);"></div></div></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center; margin-bottom: 24px;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 224px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 144px;"></div></div></a><p style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;"><a href="https://www.instagram.com/reel/DF6-GG9NtZo/?utm_source=ig_embed&amp;utm_campaign=loading" style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none;" target="_blank">A post shared by SEVA MANTRA (@sk_servicespune)</a></p></div></blockquote>
<script async src="//www.instagram.com/embed.js"></script>`,
    }
  ];

  const workflowSteps = [
    {
      id: 1,
      title: "Initial Consultation",
      description: "We assess your space and understand your specific cleaning requirements",
      icon: <Calendar className="w-8 h-8" />,
      color: "from-blue-500 to-blue-600"
    },
    {
      id: 2,
      title: "Custom Planning",
      description: "Create a tailored cleaning plan with timeline and methodology",
      icon: <ClipboardCheck className="w-8 h-8" />,
      color: "from-green-500 to-green-600"
    },
    {
      id: 3,
      title: "Professional Execution",
      description: "Our trained team performs deep cleaning using advanced equipment",
      icon: <Brush className="w-8 h-8" />,
      color: "from-purple-500 to-purple-600"
    },
    {
      id: 4,
      title: "Quality Inspection",
      description: "Final walkthrough and quality assurance before project completion",
      icon: <CheckSquare className="w-8 h-8" />,
      color: "from-orange-500 to-orange-600"
    }
  ];

  // Initialize Lenis smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Auto-cycle images every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  // Auto-cycle workflow steps every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % workflowSteps.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [workflowSteps.length]);

  // Function to extract real data from Instagram embed codes
  const extractReelData = (embedCode: string) => {
    const data: any = {};

    // Extract reel ID and URL
    const reelIdMatch = embedCode.match(/reel\/([A-Za-z0-9_-]+)/);
    if (reelIdMatch) {
      data.id = reelIdMatch[1];
      data.reelUrl = `https://www.instagram.com/reel/${reelIdMatch[1]}/`;
    }

    return data;
  };

  // Function to fetch Instagram thumbnail using oEmbed API
  const fetchInstagramThumbnail = async (reelUrl: string) => {
    try {
      const response = await fetch(`https://api.instagram.com/oembed?url=${encodeURIComponent(reelUrl)}`);
      if (response.ok) {
        const data = await response.json();
        return data.thumbnail_url;
      }
    } catch (error) {
      console.log('Instagram oEmbed API failed, using fallback');
    }

    // Fallback: Try Instagram CDN pattern
    const reelIdMatch = reelUrl.match(/reel\/([A-Za-z0-9_-]+)/);
    if (reelIdMatch) {
      const reelId = reelIdMatch[1];
      return `https://scontent.cdninstagram.com/v/t51.2885-15/${reelId}/n.jpg?stp=dst-jpg_e35&_nc_ht=scontent.cdninstagram.com&_nc_cat=108&_nc_ohc=${reelId}&edm=APU89FAAAAAA&ccb=7-5&oh=00_AfC${reelId}&oe=${reelId}&ig_cache_key=${reelId}`;
    }

    return null;
  };

  // Process reels: use Unsplash thumbnails related to titles; keep reel URLs for opening
  const [processedReels, setProcessedReels] = useState<any[]>([]);
  const [isLoadingThumbnails, setIsLoadingThumbnails] = useState(true);

  useEffect(() => {
    const processReels = async () => {
      setIsLoadingThumbnails(true);
      try {
        const reelsWithThumbnails = instagramReels.map((reel) => {
          const extractedData = extractReelData(reel.embedCode);
          // Prefer provided Unsplash/source thumbnails; do not override
          return {
            ...reel,
            id: extractedData.id || reel.id,
            thumbnail: reel.thumbnail,
            videoThumbnail: reel.videoThumbnail,
            reelUrl: extractedData.reelUrl
          };
        });

        setProcessedReels(reelsWithThumbnails);
      } catch (error) {
        console.error('Error fetching Instagram thumbnails:', error);
        // Fallback to original reels if thumbnail fetching fails
        setProcessedReels(instagramReels);
      } finally {
        setIsLoadingThumbnails(false);
      }
    };

    processReels();
  }, []);

  const handleReelClick = (reel: any) => {
    const extracted = reel.embedCode ? extractReelData(reel.embedCode) : {};
    const url = reel.reelUrl || extracted.reelUrl;
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
      return;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Premium Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-white overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234F46E5' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center min-h-screen py-20">

            <div className="space-y-12">
              <div className="space-y-8">
                <div className="inline-flex items-center px-4 py-2 bg-slate-100 rounded-full text-slate-700 text-sm font-medium animate-pulse">
                  <Shield className="w-4 h-4 mr-2" />
                  Trusted by Industry Leaders
                </div>

                <h1 className="text-6xl lg:text-7xl font-display font-semibold leading-tight text-slate-900">
                  Premium
                  <br />
                  <span className="gradient-text">Cleaning</span>
                  <br />
                  Services
                </h1>

                <p className="text-xl text-slate-600 leading-relaxed max-w-lg">
                  Transform your workspace with professional deep cleaning solutions.
                  Spotless, hygienic environments for offices, restaurants, and industrial facilities.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="text-lg px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  onClick={() => (window as any).openChatbot?.()}
                >
                  Book an Appointment
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-4 border-slate-300 text-slate-700 hover:bg-slate-50 rounded-xl transition-all duration-300 hover:scale-105"
                  onClick={() => window.location.href = 'tel:9209447145'}
                >
                  <Phone className="mr-2 w-5 h-5" />
                  92094 47145
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-8 pt-8">
                <div className="text-center group">
                  <div className="text-3xl font-display font-semibold text-slate-900 mb-1 transition-transform duration-300 group-hover:scale-110">100+</div>
                  <div className="text-sm text-slate-500">Projects</div>
                </div>
                <div className="text-center group">
                  <div className="text-3xl font-display font-semibold text-slate-900 mb-1 transition-transform duration-300 group-hover:scale-110">95%</div>
                  <div className="text-sm text-slate-500">Satisfaction</div>
                </div>
                <div className="text-center group">
                  <div className="text-3xl font-display font-semibold text-slate-900 mb-1 transition-transform duration-300 group-hover:scale-110">50+</div>
                  <div className="text-sm text-slate-500">Happy Clients</div>
                </div>
              </div>
            </div>

            {/* Cycling Images Side */}
            <div className="lg:justify-self-end w-full">
              <div className="relative w-full">
                <div className="aspect-[4/5] max-w-lg mx-auto relative overflow-hidden rounded-l bg-slate-100 shadow-2xl">
                  {heroImages.map((image, index) => (
                    <img
                      key={index}
                      src={image.url}
                      alt={image.alt}
                      className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${index === currentImageIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                        }`}

                    />
                  ))}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {heroImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`h-2 rounded-full transition-all duration-300 ${index === currentImageIndex
                          ? 'bg-white w-8'
                          : 'bg-white/50 w-2'
                          }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Instagram Reels Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-20">
            <h2 className="text-5xl font-display font-semibold text-slate-900">
              Our <span className="gradient-text"> Work</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Watch our cleaning transformations in action through our latest Instagram reels
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {isLoadingThumbnails ? (
              // Loading skeleton
              Array.from({ length: 4 }).map((_, index) => (
                <Card key={`loading-${index}`} className="group overflow-hidden border-0 shadow-lg">
                  <div className="relative h-64 overflow-hidden bg-slate-200 animate-pulse">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-slate-400">Loading...</div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="h-4 bg-slate-200 rounded animate-pulse mb-2"></div>
                    <div className="h-3 bg-slate-200 rounded animate-pulse mb-4"></div>
                    <div className="h-8 bg-slate-200 rounded animate-pulse"></div>
                  </CardContent>
                </Card>
              ))
            ) : (
              processedReels.map((reel, index) => (
                <Card
                  key={index}
                  className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 h-[400px] relative"
                >
                  <div className="absolute inset-0 cursor-pointer" onClick={() => handleReelClick(reel)}>
                    {reel.videoThumbnail ? (
                      <video
                        src={reel.videoThumbnail}
                        className="w-full h-full object-cover"
                        autoPlay
                        muted
                        loop
                        playsInline
                      />
                    ) : (
                      <img
                        src={reel.thumbnail}
                        alt={reel.title}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                      />
                    )}

                    {/* Animated overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent ${reel.videoThumbnail ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity duration-300`}></div>

                    {/* Instagram Badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <div className="px-3 py-1 rounded-full text-white text-sm font-bold transition-all duration-300 bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse">
                        REEL
                      </div>
                    </div>

                    {/* Play button overlay */}
                    {!reel.videoThumbnail && (
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 animate-pulse">
                          <Play className="w-8 h-8 text-white" />
                        </div>
                      </div>
                    )}

                    {/* Instagram icon */}
                    <div className="absolute top-4 right-4 z-10">
                      <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-full">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                    <h3 className="text-lg font-display font-semibold mb-2 text-white drop-shadow-md">{reel.title}</h3>
                    {reel.description && <p className="text-slate-200 mb-4 text-sm drop-shadow-md line-clamp-2">{reel.description}</p>}

                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white hover:text-purple-600 transition-all duration-300"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleReelClick(reel);
                      }}
                    >
                      Watch Reel
                    </Button>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Services Section - Minimalistic */}
      <section className="py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-20">
            <h2 className="text-5xl font-display font-semibold text-slate-900">
              Our Services
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Professional cleaning solutions tailored to your specific needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {/* Commercial Cleaning */}
            <Card className="group hover:shadow-xl transition-all duration-500 border-0 bg-white transform hover:-translate-y-2">
              <CardContent className="p-10">
                <div className="bg-blue-50 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:bg-blue-100 group-hover:scale-110 transition-all duration-300">
                  <Building2 className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-2xl font-display font-semibold mb-4 text-slate-900 text-center">Commercial Cleaning</h3>
                <h4 className="text-lg font-semibold text-blue-600 mb-4 text-center">Pristine Workspaces. Elevated Impressions.</h4>
                <p className="text-slate-600 leading-relaxed mb-6 text-sm">
                  From boardrooms to shop floors, we deliver unmatched commercial cleaning designed to impress your clients and boost employee productivity. Our trained professionals handle every inch — carpets, glass, workstations, and high-traffic zones — with industry-grade precision. We work around your schedule, ensuring zero disruption and a consistently spotless environment that speaks volumes about your brand.
                </p>
                <div className="text-center">
                  <p className="text-blue-600 font-semibold mb-4 italic">"Because a clean business is good business."</p>
                </div>
              </CardContent>
            </Card>

            {/* Residential Cleaning */}
            <Card className="group hover:shadow-xl transition-all duration-500 border-0 bg-white transform hover:-translate-y-2">
              <CardContent className="p-10">
                <div className="bg-green-50 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:bg-green-100 group-hover:scale-110 transition-all duration-300">
                  <Home className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-display font-semibold mb-4 text-slate-900 text-center">Residential Cleaning</h3>
                <h4 className="text-lg font-semibold text-green-600 mb-4 text-center">Your Home, Transformed into Perfection.</h4>
                <p className="text-slate-600 leading-relaxed mb-6 text-sm">
                  Whether it's deep cleaning for festivals, a move-in handover, or routine upkeep, we treat your home like it's our own. Our expert team uses advanced cleaning techniques and safe, eco-friendly products to revive every corner — from kitchen tiles to bathroom fixtures. Expect immaculate floors, dust-free surfaces, and a refreshing, healthy living space your family will love coming home to.
                </p>
                <div className="text-center">
                  <p className="text-green-600 font-semibold mb-4 italic">"Luxury cleaning, without the luxury price tag."</p>
                </div>
              </CardContent>
            </Card>

            {/* Renovation Services */}
            <Card className="group hover:shadow-xl transition-all duration-500 border-0 bg-white transform hover:-translate-y-2">
              <CardContent className="p-10">
                <div className="bg-purple-50 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:bg-purple-100 group-hover:scale-110 transition-all duration-300">
                  <Brush className="w-10 h-10 text-purple-600" />
                </div>
                <h3 className="text-2xl font-display font-semibold mb-4 text-slate-900 text-center">Renovation Services</h3>
                <h4 className="text-lg font-semibold text-purple-600 mb-4 text-center">From Concept to Completion — We Build Your Vision.</h4>
                <p className="text-slate-600 leading-relaxed mb-6 text-sm">
                  Whether you're upgrading furniture, revamping interiors, or executing a full-scale property renovation, our end-to-end service brings your ideas to life with precision and style. We handle planning, design, execution, and finishing under one roof — ensuring quality control at every stage. From modern apartments to sprawling villas and premium commercial spaces, we transform spaces into statement pieces that reflect your taste and needs.
                </p>
                <div className="text-center">
                  <p className="text-purple-600 font-semibold mb-4 italic">"We don't just renovate. We redefine."</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How We Work - Animated Workflow */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-20">
            <h2 className="text-5xl font-display font-semibold text-slate-900">
              How We <span className="gradient-text">Work</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our systematic approach to delivering exceptional cleaning results
            </p>
          </div>

          {/* Animated Workflow */}
          <div className="relative">
            {/* Animated connection line */}
            <div className="hidden lg:block absolute top-20 left-0 w-full h-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-1000 ease-in-out"
                style={{
                  width: `${((activeStep + 1) / workflowSteps.length) * 100}%`,
                  boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)'
                }}
              ></div>
            </div>

            <div className="grid lg:grid-cols-4 gap-8">
              {workflowSteps.map((step, index) => (
                <div
                  key={step.id}
                  className={`relative group transition-all duration-500 ${index <= activeStep ? 'transform scale-105' : ''
                    }`}
                >
                  <Card className={`border-0 bg-white shadow-lg hover:shadow-2xl transition-all duration-500 ${index === activeStep ? 'ring-4 ring-blue-500/50 shadow-2xl' : ''
                    }`}>
                    <CardContent className="p-8 text-center">
                      {/* Animated step number */}
                      <div className={`absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center font-bold text-white transition-all duration-500 ${index <= activeStep
                        ? `bg-gradient-to-r ${step.color} scale-110 animate-pulse`
                        : 'bg-slate-300'
                        }`}>
                        {step.id}
                      </div>

                      {/* Animated icon */}
                      <div className={`bg-gradient-to-br ${step.color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white transition-all duration-500 ${index === activeStep
                        ? 'animate-bounce scale-110'
                        : index < activeStep
                          ? 'scale-105'
                          : 'scale-100 opacity-60'
                        }`}>
                        {step.icon}
                      </div>

                      <h3 className="text-xl font-display font-semibold mb-4 text-slate-900">
                        {step.title}
                      </h3>
                      <p className="text-slate-600 leading-relaxed">
                        {step.description}
                      </p>

                      {/* Progress indicator */}
                      {index === activeStep && (
                        <div className="mt-4 w-full bg-slate-200 rounded-full h-2">
                          <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full animate-pulse" style={{ width: '100%' }}></div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>

            {/* Manual step controls */}
            <div className="flex justify-center mt-8 space-x-2">
              {workflowSteps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveStep(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${index === activeStep
                    ? 'bg-blue-500 scale-125'
                    : index < activeStep
                      ? 'bg-green-500'
                      : 'bg-slate-300'
                    }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Simple */}
      <section className="py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h2 className="text-5xl font-display font-semibold text-slate-900">
                Why Choose SEVA MANTRA
              </h2>
              <p className="text-xl text-slate-600 leading-relaxed">
                Professional, reliable, and trusted by industry leaders including TATA.
                We deliver exceptional results with advanced equipment and eco-friendly solutions.
              </p>

              <div className="space-y-6">
                {[
                  {
                    title: "100% Professional & Reliable",
                    description: "Trained, vetted, and experienced cleaning professionals"
                  },
                  {
                    title: "Advanced Equipment",
                    description: "State-of-the-art cleaning technology and Premium Quality chemicals "
                  },
                  {
                    title: "Trusted by Industry Leaders",
                    description: "Proven track record with clients like TATA and major corporations"
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-4 group">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300" />
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-1">{item.title}</h4>
                      <p className="text-slate-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-xl group hover:shadow-2xl transition-all duration-500">
              <img
                src="https://images.unsplash.com/photo-1585417238790-f6d290d6490c?q=80&w=1537&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Professional cleaner in laboratory environment - Why Choose SEVA MANTRA"
                className="w-full h-80 object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Packages Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-20">
            <h2 className="text-5xl font-display font-semibold text-slate-900">
              Home Cleaning <span className="gradient-text">Packages</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Choose the perfect level of perfection for your space with our exclusive cleaning packages
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Basic Package */}
            <Card className="group hover:shadow-xl transition-all duration-500 border-0 bg-white transform hover:-translate-y-2 border-2 border-blue-100">
              <CardContent className="p-8 text-center">
                <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-100 group-hover:scale-110 transition-all duration-300">
                  <span className="text-2xl">💎</span>
                </div>
                <h3 className="text-2xl font-display font-semibold mb-4 text-slate-900">Basic Package</h3>
                <p className="text-slate-600 mb-6">Perfect for regular maintenance</p>
                <div className="space-y-3 text-sm text-slate-600 mb-8">
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Dry Cleaning of Floors

                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Professional Mopping
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Perfect for unfurnished flats, quick refreshes, and light upkeep.
                  </div>
                </div>
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => (window as any).openChatbot?.()}
                >
                  Choose Basic
                </Button>
              </CardContent>
            </Card>

            {/* Premium Package */}
            <Card className="group hover:shadow-xl transition-all duration-500 border-0 bg-white transform hover:-translate-y-2 border-2 border-green-100 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </div>
              <CardContent className="p-8 text-center">
                <div className="bg-green-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-green-100 group-hover:scale-110 transition-all duration-300">
                  <span className="text-2xl">⭐</span>
                </div>
                <h3 className="text-2xl font-display font-semibold mb-4 text-slate-900">Premium Package</h3>
                <p className="text-slate-600 mb-6">Perfect for thorough cleaning</p>
                <div className="space-y-3 text-sm text-slate-600 mb-8">
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Furniture Cleaning (outside surfaces only)
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Window Chemical Wash for a streak-free shine
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Lights & Switchboards Cleaning
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Wall Dry Cleaning                  </div>
                </div>
                <Button
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => (window as any).openChatbot?.()}
                >
                  Choose Premium
                </Button>
              </CardContent>
            </Card>

            {/* Luxury Package */}
            <Card className="group hover:shadow-xl transition-all duration-500 border-0 bg-white transform hover:-translate-y-2 border-2 border-purple-100">
              <CardContent className="p-8 text-center">
                <div className="bg-purple-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-100 group-hover:scale-110 transition-all duration-300">
                  <span className="text-2xl">👑</span>
                </div>
                <h3 className="text-2xl font-display font-semibold mb-4 text-slate-900">Luxury Package</h3>
                <p className="text-slate-600 mb-6">Perfect for the uncompromising</p>
                <div className="space-y-3 text-sm text-slate-600 mb-8">
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Walls – Dry + Chemical Wash                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Complete Furniture Deep Cleaning                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Appliance Cleaning                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Floor Deep Scrubbing                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Post-service inspection
                  </div>
                </div>
                <Button
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                  onClick={() => (window as any).openChatbot?.()}
                >
                  Choose Luxury
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Simple Testimonial */}
      <section className="py-32 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Quote className="w-16 h-16 text-slate-300 mx-auto mb-8 animate-pulse" />
          <blockquote className="text-2xl font-display text-slate-700 mb-8 leading-relaxed">
            "SEVA MANTRA transformed our office environment beyond expectations.
            Their professional approach and attention to detail is unmatched."
          </blockquote>
          <div className="flex items-center justify-center space-x-4">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face"
              alt="Client testimonial"
              className="w-12 h-12 rounded-full border-2 border-blue-500"
            />
            <div className="text-left">
              <div className="font-semibold text-slate-900">Rajesh Patel</div>
              <div className="text-slate-600">Facilities Manager, TATA</div>
            </div>
          </div>
          <div className="flex justify-center mt-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}