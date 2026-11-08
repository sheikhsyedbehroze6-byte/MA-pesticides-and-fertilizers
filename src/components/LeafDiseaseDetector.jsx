import { useState, useRef, useId, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { trackEvent } from '../utils/analytics';
import {
  Camera, Upload, CheckCircle2, ShieldCheck,
  RefreshCw, ArrowRight, Zap, X, Check,
  Copy, MessageSquare
} from 'lucide-react';

/* eslint-disable react-refresh/only-export-components */
export const LEAF_DISEASES_DB = [
  {
    id: 'apple_scab',
    crop: 'Apple / سیب',
    name: 'Apple Scab',
    nameUrdu: 'ایپل سکیب (سیب کی خارش)',
    pathogen: 'Venturia inaequalis',
    severity: 'Critical',
    confidenceScore: 98.4,
    symptoms: 'Olive-green to velvety dark brown or black lesions on leaf surfaces; leaf puckering, distortion, and premature leaf drop.',
    symptomsUrdu: 'پتوں پر زیتونی سبز اور سیاہ مخملی دھبے، پتے مڑنا اور قبل از وقت گرنا۔',
    primaryCure: 'Superstar Dodine 65% WP or Bayer Antracol (Propineb 70% WP)',
    recommendedProductId: 'dodine',
    alternateProductId: 'antracol',
    dosageRate: '1.0 g / Litre (Dodine) or 2.5 g / Litre (Antracol)',
    sprayStage: 'Delayed Green Tip to Pink Bud & Petal Fall (Critical rain window)',
    mixingNotice: 'Do not mix Dodine with mineral oils, sulfur, or solvent EC formulations. Pre-dissolve in lukewarm water.',
    image: '/apple-scab.webp',
    keySign: 'Olive-green velvety dark spots',
    category: 'Foliar Fungus',
    colorSignature: { darkNecrosis: 0.65, chlorosis: 0.25, whiteMold: 0.05, bronze: 0.05 }
  },
  {
    id: 'powdery_mildew',
    crop: 'Apple / سیب',
    name: 'Powdery Mildew',
    nameUrdu: 'پاؤڈری پھپھوندی (سفید پاؤڈر)',
    pathogen: 'Podosphaera leucotricha',
    severity: 'Medium',
    confidenceScore: 97.2,
    symptoms: 'White powdery, talcum-like fungal growth coating leaf surfaces, tender terminal shoots, and flower buds.',
    symptomsUrdu: 'پتوں اور شگوفوں پر سفید آٹے جیسا پاؤڈر، پتوں کا سکڑنا۔',
    primaryCure: 'Luna Experience (Fluopyram + Tebuconazole) or Contaf (Hexaconazole 5% EC)',
    recommendedProductId: 'luna',
    alternateProductId: 'hexaconazole',
    dosageRate: '1.0 ml / Litre of water',
    sprayStage: 'Pink Bud to Petal Fall (Pre-rain dry periods)',
    mixingNotice: 'Apply during morning calm before temperature exceeds 28°C to prevent foliar vapor scorching.',
    image: 'https://www.gardendesign.com/pictures/images/400x320Exact_0x0/site_3/powdery-mildew-powdery-mildew-on-squash-leaf-shutterstock-com_13365.jpg',
    keySign: 'White flour-like powdery coating',
    category: 'Foliar Fungus',
    colorSignature: { whiteMold: 0.75, chlorosis: 0.15, darkNecrosis: 0.05, bronze: 0.05 }
  },
  {
    id: 'red_mite',
    crop: 'Apple / سیب',
    name: 'European Red Mite',
    nameUrdu: 'سرخ مکڑی (ریڈ مائٹ)',
    pathogen: 'Panonychus ulmi',
    severity: 'High',
    confidenceScore: 96.8,
    symptoms: 'Foliage turns dull bronze, rusty copper-brown or scorched; fine yellow stippling and minute webbing on leaf undersides.',
    symptomsUrdu: 'پتے بھورے یا پیتل نما ہو جاتے ہیں، پتوں کے نیچے باریک جالا اور زرد نشانات۔',
    primaryCure: 'Mitofix (Propargite 57% EC) or Magister (Fenazaquin 10% EC)',
    recommendedProductId: 'mitofix',
    alternateProductId: 'fenazaquin',
    dosageRate: '1.5 ml / Litre of water',
    sprayStage: 'June Drop / Hot Dry Summer Windows (Above 5 mites per leaf)',
    mixingNotice: 'Ensure complete wetting of leaf undersides. Do not apply within 21 days of sulfur application.',
    image: 'https://content.ces.ncsu.edu/media/images/Transparency0235.jpg',
    keySign: 'Bronzed rust foliage & leaf stippling',
    category: 'Acaricide / Pest',
    colorSignature: { bronze: 0.70, chlorosis: 0.20, darkNecrosis: 0.08, whiteMold: 0.02 }
  },
  {
    id: 'alternaria_blight',
    crop: 'Apple / سیب',
    name: 'Alternaria Leaf Blotch',
    nameUrdu: 'الٹرنیریا بلائٹ (پتوں پر گہرے دھبے)',
    pathogen: 'Alternaria mali',
    severity: 'High',
    confidenceScore: 95.5,
    symptoms: 'Circular dark brown or purplish-black necrotic lesions surrounded by yellow-green halos; premature defoliation.',
    symptomsUrdu: 'پتوں پر گہرے بھورے گول دھبے جن کے گرد جامنی ہالہ ہو، پتے زرد ہو کر گرنا۔',
    primaryCure: 'Difenoconazole 25% EC (Score / Willowood) or Indofil M-45 (Mancozeb 75% WP)',
    recommendedProductId: 'difenoconazole',
    alternateProductId: 'mancozeb',
    dosageRate: '0.5 ml / Litre (Difenoconazole) or 2.5 g / Litre (Mancozeb)',
    sprayStage: 'Fruit Sizing & Warm Rainy July–August Windows',
    mixingNotice: 'Alternate chemical FRAC groups to prevent resistance buildup across continuous wet spells.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8AJmDzURXRJziuZVqFVMavcvJqNF8AMsL2A&s',
    keySign: 'Circular brown spots with halo',
    category: 'Foliar Fungus',
    colorSignature: { darkNecrosis: 0.50, purpleHalo: 0.30, chlorosis: 0.15, bronze: 0.05 }
  },
  {
    id: 'peach_leaf_curl',
    crop: 'Peach & Nectarine / آڑو',
    name: 'Peach Leaf Curl',
    nameUrdu: 'آڑو کے پتوں کا مڑنا (پچ لیف کرل)',
    pathogen: 'Taphrina deformans',
    severity: 'High',
    confidenceScore: 98.1,
    symptoms: 'Leaves become severely thickened, puckered, blistered and curled with reddish, pink, and yellow distortion.',
    symptomsUrdu: 'پتے موٹے، گچھے دار، لال اور پیلے رنگ میں مسخ ہو جاتے ہیں۔',
    primaryCure: 'Copper Oxychloride 50% WP (Blitox / Cu-50)',
    recommendedProductId: 'copper_oxy',
    alternateProductId: 'dodine',
    dosageRate: '3.0 g / Litre of water',
    sprayStage: 'Delayed Dormancy / Swollen Bud Stage (Before bud swell break)',
    mixingNotice: 'Once symptoms appear on leaves, chemical cure is ineffective for current foliage; protect new flushes.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Taphrina_deformans_on_peach_leaves.jpg/800px-Taphrina_deformans_on_peach_leaves.jpg',
    keySign: 'Thickened red blistered curled foliage',
    category: 'Foliar Fungus',
    colorSignature: { curledRed: 0.65, chlorosis: 0.20, darkNecrosis: 0.10, whiteMold: 0.05 }
  },
  {
    id: 'cherry_leaf_spot',
    crop: 'Cherry & Almond / چیری اور بادام',
    name: 'Cherry Leaf Spot & Shot Hole',
    nameUrdu: 'چیری کے پتوں کے سرخ داغ اور سوراخ',
    pathogen: 'Blumeriella jaapii',
    severity: 'High',
    confidenceScore: 94.7,
    symptoms: 'Small circular purplish-red spots on foliage that dry out and drop out, leaving perforated shot holes.',
    symptomsUrdu: 'پتوں پر جامنی داغ جو سوکھ کر گرتے ہیں اور پتے میں سوراخ بن جاتے ہیں۔',
    primaryCure: 'Fargo Super (Captan 50% WP) or Difenoconazole 25% EC',
    recommendedProductId: 'captan',
    alternateProductId: 'difenoconazole',
    dosageRate: '2.0 g / Litre of water',
    sprayStage: 'Post-Petal Fall and Shuck Fall Stage',
    mixingNotice: 'Apply thoroughly to upper and lower canopy leaves. Do not mix Captan with oil formulations.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/Cherry_Leaf_Spot_2.jpg',
    keySign: 'Perforated shot holes & purple dots',
    category: 'Foliar Fungus',
    colorSignature: { darkNecrosis: 0.45, purpleHalo: 0.35, chlorosis: 0.15, bronze: 0.05 }
  },
  {
    id: 'woolly_aphid',
    crop: 'Apple & Pear / سیب اور ناشپاتی',
    name: 'Woolly Apple Aphid',
    nameUrdu: 'اُونی مکھو (سفید روئی دار کیڑا)',
    pathogen: 'Eriosoma lanigerum',
    severity: 'High',
    confidenceScore: 96.2,
    symptoms: 'White cottony, wool-like waxy masses along leaf veins, axils, pruning wounds, and bark cracks.',
    symptomsUrdu: 'پتوں کی رگوں اور شاخوں پر سفید روئی نما جالے اور کیڑے۔',
    primaryCure: 'Cyclone 505 (Chlorpyrifos 50% + Cypermethrin 5%) or Confidor (Imidacloprid)',
    recommendedProductId: 'cyclone',
    alternateProductId: 'imidacloprid',
    dosageRate: '1.5 ml / Litre (Cyclone) or 0.5 ml / Litre (Imidacloprid)',
    sprayStage: 'Post-Petal Fall and Post-Harvest Trunk Drenching',
    mixingNotice: 'Add a non-ionic sticker/spreader to penetrate the dense water-repellent waxy wool.',
    image: 'https://www.southernliving.com/thmb/hPrsQq6dKv7ApT_5OBtNFKdVJe0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-2225393975-1bd038a09cdd4fa78394c9a95151d848.jpg',
    keySign: 'White cottony wool along veins',
    category: 'Sap-Sucking Insect',
    colorSignature: { whiteMold: 0.60, darkNecrosis: 0.20, chlorosis: 0.15, bronze: 0.05 }
  },
  {
    id: 'late_blight',
    crop: 'Vegetables / سبزیاں',
    name: 'Late Blight',
    nameUrdu: 'آلو اور ٹماٹر کا پچھیتا جھلساؤ',
    pathogen: 'Phytophthora infestans',
    severity: 'Critical',
    confidenceScore: 97.5,
    symptoms: 'Water-soaked irregular brown lesions on leaves; white fuzzy mold on leaf undersides during humid cool mornings.',
    symptomsUrdu: 'پتوں پر گیلے گہرے داغ، نم موسم میں سفید پھپھوندی۔',
    primaryCure: 'Mancozeb 75% WP (Indofil M-45) or Copper Oxychloride 50% WP',
    recommendedProductId: 'mancozeb',
    alternateProductId: 'copper_oxy',
    dosageRate: '2.5 g / Litre of water',
    sprayStage: 'Active Vegetative & Monsoonal Damp Periods',
    mixingNotice: 'Spray every 7-10 days during continuous cloudy, wet weather with high humidity (>80%).',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT59UZq2s60UL9MJwEcSN_GPXNlgsSpAsWM9w&s',
    keySign: 'Water-soaked brown lesions',
    category: 'Oomycete Blight',
    colorSignature: { darkNecrosis: 0.60, chlorosis: 0.20, whiteMold: 0.15, bronze: 0.05 }
  },
  {
    id: 'healthy_leaf',
    crop: 'All Fruit Crops / تمام پھل',
    name: 'Healthy Foliage',
    nameUrdu: 'صحت مند پتے (کوئی بیماری نہیں)',
    pathogen: 'Non-infected leaf tissue',
    severity: 'Healthy',
    confidenceScore: 99.1,
    symptoms: 'Uniform vibrant green coloration; intact leaf cuticles without necrotic spots, fungal mycelium, or pest stippling.',
    symptomsUrdu: 'پتے بالکل سرسبز اور تندرست ہیں، کوئی داغ یا بیماری موجود نہیں ہے۔',
    primaryCure: 'IPL 5G Neo+ (Bio-Stimulant) or Multi-K (Potassium Nitrate 13-0-45)',
    recommendedProductId: 'ipl_5g',
    alternateProductId: 'potassium_nitrate',
    dosageRate: '2.0 ml / Litre (IPL 5G) or 5.0 g / Litre (Multi-K)',
    sprayStage: 'Fruit Expansion & Cell Division Window (June–July)',
    mixingNotice: 'Apply foliar nutrients during early morning to support cellular division and natural plant vigor.',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80',
    keySign: 'Vibrant green, clean cuticle',
    category: 'Plant Health',
    colorSignature: { greenness: 0.90, darkNecrosis: 0.02, whiteMold: 0.02, chlorosis: 0.04, bronze: 0.02 }
  }
];

export const DISEASE_PROFILES = {
  healthy_leaf: { green: 0.94, necrosis: 0.01, mildew: 0.01, bronze: 0.01, chlorosis: 0.02, purple: 0.01, curl: 0.0 },
  apple_scab: { green: 0.40, necrosis: 0.38, mildew: 0.01, bronze: 0.03, chlorosis: 0.14, purple: 0.04, curl: 0.0 },
  powdery_mildew: { green: 0.28, necrosis: 0.03, mildew: 0.48, bronze: 0.02, chlorosis: 0.18, purple: 0.01, curl: 0.0 },
  red_mite: { green: 0.22, necrosis: 0.05, mildew: 0.01, bronze: 0.46, chlorosis: 0.24, purple: 0.02, curl: 0.0 },
  alternaria_blight: { green: 0.32, necrosis: 0.30, mildew: 0.01, bronze: 0.03, chlorosis: 0.20, purple: 0.14, curl: 0.0 },
  peach_leaf_curl: { green: 0.20, necrosis: 0.06, mildew: 0.01, bronze: 0.02, chlorosis: 0.18, purple: 0.05, curl: 0.48 },
  cherry_leaf_spot: { green: 0.36, necrosis: 0.24, mildew: 0.01, bronze: 0.02, chlorosis: 0.14, purple: 0.23, curl: 0.0 },
  woolly_aphid: { green: 0.34, necrosis: 0.18, mildew: 0.36, bronze: 0.02, chlorosis: 0.08, purple: 0.02, curl: 0.0 },
  late_blight: { green: 0.28, necrosis: 0.44, mildew: 0.12, bronze: 0.02, chlorosis: 0.14, purple: 0.0, curl: 0.0 }
};

export default function LeafDiseaseDetector({ onApplyDosage, selectedProductId }) {
  const [selectedDisease, setSelectedDisease] = useState(LEAF_DISEASES_DB[0]);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [appliedNotification, setAppliedNotification] = useState(false);
  const [copiedDiagnosis, setCopiedDiagnosis] = useState(false);

  // Live Camera state
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraFacing, setCameraFacing] = useState('environment');
  const [cameraError, setCameraError] = useState(null);

  const fileInputId = useId();
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const activeObjectUrlRef = useRef(null);

  // Stop camera feed and release hardware
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera();
      if (activeObjectUrlRef.current && activeObjectUrlRef.current.startsWith('blob:')) {
        URL.revokeObjectURL(activeObjectUrlRef.current);
      }
    };
  }, [stopCamera]);

  // Start live camera stream
  const startCamera = async (facing = cameraFacing) => {
    try {
      stopCamera();
      setCameraError(null);
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setCameraError('Camera is not supported on this browser. Please use photo upload.');
        return;
      }

      const constraints = {
        video: {
          facingMode: facing === 'environment' ? { ideal: 'environment' } : 'user',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setIsCameraActive(true);
    } catch {
      setCameraError('Camera access was not permitted. You can upload a photo instead.');
      setIsCameraActive(false);
    }
  };

  const toggleCameraFacing = () => {
    const nextFacing = cameraFacing === 'environment' ? 'user' : 'environment';
    setCameraFacing(nextFacing);
    if (isCameraActive) {
      startCamera(nextFacing);
    }
  };

  // Fast pixel analysis to match disease profile
  const analyzeImage = useCallback((imgElement, fallbackDisease = null) => {
    try {
      const canvas = document.createElement('canvas');
      const w = 120;
      const h = 120;
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      ctx.drawImage(imgElement, 0, 0, w, h);
      const imgData = ctx.getImageData(0, 0, w, h);
      const data = imgData.data;

      let leafPixels = 0;
      let greenPixels = 0;
      let necroticPixels = 0;
      let mildewPixels = 0;
      let bronzePixels = 0;
      let chlorosisPixels = 0;
      let purplePixels = 0;
      let curlPixels = 0;

      for (let i = 0; i < data.length; i += 4) {
        const a = data[i + 3];
        if (a < 50) continue;

        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // Background rejection (pure white/glare or pure dark)
        if (r > 240 && g > 240 && b > 240) continue;
        if (r < 20 && g < 20 && b < 20) continue;

        const totalRGB = r + g + b || 1;
        const rNorm = r / totalRGB;
        const gNorm = g / totalRGB;
        const bNorm = b / totalRGB;
        const exG = (2 * g) - r - b;
        const lum = (r * 299 + g * 587 + b * 114) / 1000;

        // Skip human hand skin tone
        if (r > 125 && g > 75 && b > 55 && r > g && g > b && (r - g) > 18 && exG < -15) continue;

        leafPixels++;

        const isGreen = (exG > 10 && gNorm > 0.35) || (g > r * 1.05 && g > b * 1.1);
        const isWhiteMold = (lum > 155 && totalRGB > 460 && Math.abs(r - g) < 22 && Math.abs(g - b) < 22);
        const isNecrotic = !isGreen && !isWhiteMold && (lum < 90 && (r < 100 && g < 95 && b < 80));
        const isCurledRed = !isGreen && !isWhiteMold && !isNecrotic && (r > 130 && r > g * 1.3);
        const isPurple = !isGreen && !isWhiteMold && !isNecrotic && !isCurledRed && (rNorm > 0.35 && bNorm > 0.30);
        const isBronze = !isGreen && !isWhiteMold && !isNecrotic && !isCurledRed && (r > 110 && g < 105 && r > g * 1.15);
        const isChlorosis = !isGreen && !isWhiteMold && !isNecrotic && (r > 120 && g > 120 && b < 100);

        if (isNecrotic) necroticPixels++;
        else if (isWhiteMold) mildewPixels++;
        else if (isCurledRed) curlPixels++;
        else if (isPurple) purplePixels++;
        else if (isBronze) bronzePixels++;
        else if (isChlorosis) chlorosisPixels++;
        else if (isGreen) greenPixels++;
      }

      const total = Math.max(leafPixels, 50);
      const sampleVec = [
        greenPixels / total,
        necroticPixels / total,
        mildewPixels / total,
        bronzePixels / total,
        chlorosisPixels / total,
        purplePixels / total,
        curlPixels / total
      ];

      // Distance matching
      let bestMatch = fallbackDisease || LEAF_DISEASES_DB[0];
      let bestDist = Infinity;

      for (const d of LEAF_DISEASES_DB) {
        const p = DISEASE_PROFILES[d.id] || DISEASE_PROFILES.healthy_leaf;
        const pVec = [p.green, p.necrosis, p.mildew, p.bronze, p.chlorosis, p.purple, p.curl];
        let dist = 0;
        for (let j = 0; j < sampleVec.length; j++) {
          dist += (sampleVec[j] - pVec[j]) ** 2;
        }
        if (dist < bestDist) {
          bestDist = dist;
          bestMatch = d;
        }
      }

      return bestMatch;
    } catch {
      return fallbackDisease || LEAF_DISEASES_DB[0];
    }
  }, []);

  const runAnalysis = useCallback((imageSrc, fallbackDisease = null) => {
    setIsScanning(true);
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const detected = analyzeImage(img, fallbackDisease);
      setSelectedDisease(detected);
      setUploadedImage(imageSrc);
      setIsScanning(false);
    };
    img.onerror = () => {
      setSelectedDisease(fallbackDisease || LEAF_DISEASES_DB[0]);
      setUploadedImage(imageSrc);
      setIsScanning(false);
    };
    img.src = imageSrc;
  }, [analyzeImage]);

  // Capture frame from active camera
  const captureCameraFrame = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = 640;
    canvas.height = 480;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, 640, 480);
    stopCamera();

    canvas.toBlob((blob) => {
      if (!blob) return;
      if (activeObjectUrlRef.current && activeObjectUrlRef.current.startsWith('blob:')) {
        URL.revokeObjectURL(activeObjectUrlRef.current);
      }
      const blobUrl = URL.createObjectURL(blob);
      activeObjectUrlRef.current = blobUrl;
      runAnalysis(blobUrl);
    }, 'image/jpeg', 0.85);
  };

  // Upload leaf file
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (activeObjectUrlRef.current && activeObjectUrlRef.current.startsWith('blob:')) {
      URL.revokeObjectURL(activeObjectUrlRef.current);
    }
    const blobUrl = URL.createObjectURL(file);
    activeObjectUrlRef.current = blobUrl;
    stopCamera();
    runAnalysis(blobUrl);
  };

  const handleSelectDisease = (disease) => {
    stopCamera();
    setSelectedDisease(disease);
    setUploadedImage(disease.image);
  };

  const handleApplyToCalculator = () => {
    if (onApplyDosage && selectedDisease) {
      trackEvent('apply_disease_cure', {
        disease: selectedDisease.name,
        product_id: selectedDisease.recommendedProductId
      });
      onApplyDosage(selectedDisease.recommendedProductId, selectedDisease);
      setAppliedNotification(true);
      setTimeout(() => setAppliedNotification(false), 3000);
    }
  };

  const handleCopyDiagnosis = () => {
    if (!selectedDisease) return;
    const text = `Leaf Diagnosis: ${selectedDisease.name} (${selectedDisease.nameUrdu})\n` +
      `Recommended SKUAST-K Spray: ${selectedDisease.primaryCure}\n` +
      `Dilution: ${selectedDisease.dosageRate}\n` +
      `Stage: ${selectedDisease.sprayStage}\n` +
      `M.A. Pesticides & Fertilizers Srinagar (WhatsApp: +91 99065 41321)`;
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text);
      setCopiedDiagnosis(true);
      setTimeout(() => setCopiedDiagnosis(false), 2000);
    }
  };

  const handleWhatsAppConsult = () => {
    trackEvent('consult_disease_whatsapp', { disease: selectedDisease?.name });
    const text = `Assalam-o-Alaikum Sheikh Ayoub Sahib, I suspect ${selectedDisease.name} (${selectedDisease.nameUrdu}) in my orchard. Recommended spray: ${selectedDisease.primaryCure}. Please advise on current stock and tank mixing.`;
    window.open(`https://wa.me/919906541321?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  };

  const isCurrentProductSelected = selectedProductId === selectedDisease?.recommendedProductId;

  return (
    <div className="leaf-detector-card">
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: '22px',
        flexWrap: 'wrap',
        gap: '12px',
        paddingBottom: '16px',
        borderBottom: '1px solid rgba(23, 25, 28, 0.06)'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h3 style={{
              margin: 0,
              fontFamily: 'var(--font-signifier)',
              fontSize: '21px',
              fontWeight: 600,
              color: 'var(--color-ink-black)',
              letterSpacing: '-0.01em'
            }}>
              Leaf Disease Scanner &amp; Prescription
            </h3>
            <span style={{
              fontSize: '11px',
              fontWeight: 600,
              color: 'var(--color-pine-green)',
              backgroundColor: 'rgba(26, 67, 46, 0.08)',
              padding: '2px 8px',
              borderRadius: '9999px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <ShieldCheck size={12} /> SKUAST-K Standard
            </span>
          </div>
          <p style={{
            margin: '4px 0 0',
            fontSize: '13px',
            color: 'var(--color-slate-gray)',
            lineHeight: 1.4
          }}>
            Identify orchard foliar diseases by photo or select a common symptom to get the approved curative chemical dosage.
          </p>
        </div>

        {appliedNotification && (
          <div style={{
            fontSize: '12.5px',
            fontWeight: 600,
            color: 'var(--color-pine-green)',
            backgroundColor: 'rgba(26, 67, 46, 0.08)',
            padding: '6px 14px',
            borderRadius: '9999px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <CheckCircle2 size={15} />
            <span>Applied to dosage calculator below</span>
          </div>
        )}
      </div>

      {/* Main Grid: Left = Input / Disease Picker, Right = Diagnosis & Prescription */}
      <div className="leaf-detector-columns">
        
        {/* Left Column: Photo Capture & Symptom Picker */}
        <div>
          {/* Camera or Upload Area */}
          {isCameraActive ? (
            <div style={{
              position: 'relative',
              borderRadius: '12px',
              overflow: 'hidden',
              backgroundColor: '#000000',
              aspectRatio: '4/3',
              marginBottom: '16px'
            }}>
              <video
                ref={videoRef}
                playsInline
                autoPlay
                muted
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                bottom: '12px',
                left: 0,
                right: 0,
                display: 'flex',
                justifyContent: 'center',
                gap: '12px',
                padding: '0 16px'
              }}>
                <button
                  type="button"
                  onClick={toggleCameraFacing}
                  style={{
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    color: '#ffffff',
                    border: '1px solid rgba(255,255,255,0.3)',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    cursor: 'pointer',
                    fontSize: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <RefreshCw size={14} /> Flip
                </button>
                <button
                  type="button"
                  onClick={captureCameraFrame}
                  style={{
                    backgroundColor: 'var(--color-pine-green)',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '8px 18px',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Camera size={16} /> Snap Leaf
                </button>
                <button
                  type="button"
                  onClick={stopCamera}
                  style={{
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    color: '#ffffff',
                    border: '1px solid rgba(255,255,255,0.3)',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    cursor: 'pointer',
                    fontSize: '12px'
                  }}
                >
                  <X size={14} />
                </button>
              </div>
            </div>
          ) : (
            <div style={{
              border: '1px dashed rgba(23, 25, 28, 0.2)',
              borderRadius: '12px',
              padding: '20px 16px',
              backgroundColor: 'var(--surface-canvas, #fcfbf9)',
              textAlign: 'center',
              marginBottom: '18px'
            }}>
              <input
                id={fileInputId}
                type="file"
                ref={fileInputRef}
                accept="image/*"
                capture="environment"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
              />

              <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '10px' }}>
                <button
                  type="button"
                  onClick={() => startCamera('environment')}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '9px 14px',
                    borderRadius: '8px',
                    border: '1px solid rgba(23, 25, 28, 0.15)',
                    backgroundColor: '#ffffff',
                    color: 'var(--color-ink-black)',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: 500,
                    transition: 'all 0.15s ease'
                  }}
                >
                  <Camera size={15} style={{ color: 'var(--color-pine-green)' }} />
                  <span>Take Photo</span>
                </button>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '9px 14px',
                    borderRadius: '8px',
                    border: '1px solid rgba(23, 25, 28, 0.15)',
                    backgroundColor: '#ffffff',
                    color: 'var(--color-ink-black)',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: 500,
                    transition: 'all 0.15s ease'
                  }}
                >
                  <Upload size={15} style={{ color: 'var(--color-pine-green)' }} />
                  <span>Upload Image</span>
                </button>
              </div>

              <div style={{ fontSize: '11.5px', color: 'var(--color-slate-gray)' }}>
                Take or upload a clear photo of an infected leaf
              </div>

              {cameraError && (
                <div style={{
                  marginTop: '10px',
                  fontSize: '11.5px',
                  color: '#b91c1c',
                  backgroundColor: 'rgba(239, 68, 68, 0.08)',
                  padding: '6px 10px',
                  borderRadius: '6px'
                }}>
                  {cameraError}
                </div>
              )}
            </div>
          )}

          {/* Common Disease Selector */}
          <div>
            <div style={{
              fontSize: '11px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              color: 'var(--color-slate-gray)',
              marginBottom: '10px'
            }}>
              Or Choose Common Orchard Symptom:
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '8px'
            }}>
              {LEAF_DISEASES_DB.map((d) => {
                const isSelected = selectedDisease?.id === d.id;
                return (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => handleSelectDisease(d)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '8px 10px',
                      borderRadius: '10px',
                      border: isSelected
                        ? '1.5px solid var(--color-pine-green)'
                        : '1px solid rgba(23, 25, 28, 0.08)',
                      backgroundColor: isSelected ? 'rgba(26, 67, 46, 0.06)' : '#ffffff',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <img
                      src={d.image}
                      alt={d.name}
                      loading="lazy"
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '6px',
                        objectFit: 'cover',
                        flexShrink: 0,
                        backgroundColor: '#eee'
                      }}
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div style={{
                        fontSize: '12px',
                        fontWeight: isSelected ? 600 : 500,
                        color: isSelected ? 'var(--color-pine-green)' : 'var(--color-ink-black)',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}>
                        {d.name}
                      </div>
                      <div style={{
                        fontSize: '10.5px',
                        color: 'var(--color-slate-gray)',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}>
                        {d.keySign}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Diagnosis & Prescribed Treatment */}
        <div className="leaf-diagnosis-panel">
          {isScanning && (
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'rgba(255, 255, 255, 0.92)',
              borderRadius: '12px',
              zIndex: 10,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                border: '2px solid rgba(26, 67, 46, 0.15)',
                borderTopColor: 'var(--color-pine-green)',
                animation: 'spin 0.7s linear infinite'
              }} />
              <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--color-pine-green)' }}>
                Analyzing foliar symptoms...
              </span>
            </div>
          )}

          <div>
            {/* Disease Identity Row */}
            <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', marginBottom: '16px' }}>
              <img
                src={uploadedImage || selectedDisease?.image}
                alt={selectedDisease?.name}
                loading="lazy"
                style={{
                  width: '76px',
                  height: '76px',
                  borderRadius: '10px',
                  objectFit: 'cover',
                  border: '1px solid rgba(23, 25, 28, 0.1)',
                  flexShrink: 0,
                  backgroundColor: '#f1f1f1'
                }}
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px', flexWrap: 'wrap' }}>
                  <span style={{
                    fontSize: '10.5px',
                    fontWeight: 600,
                    color: selectedDisease?.severity === 'Critical' ? '#b91c1c' : 'var(--color-pine-green)',
                    backgroundColor: selectedDisease?.severity === 'Critical' ? 'rgba(185, 28, 28, 0.08)' : 'rgba(26, 67, 46, 0.08)',
                    padding: '2px 7px',
                    borderRadius: '4px'
                  }}>
                    {selectedDisease?.severity}
                  </span>
                  <span style={{ fontSize: '11.5px', color: 'var(--color-slate-gray)' }}>
                    {selectedDisease?.crop}
                  </span>
                </div>

                <h4 style={{
                  margin: '2px 0 2px',
                  fontFamily: 'var(--font-signifier)',
                  fontSize: '19px',
                  fontWeight: 600,
                  color: 'var(--color-ink-black)',
                  lineHeight: 1.2
                }}>
                  {selectedDisease?.name}
                </h4>

                <div style={{ fontSize: '12px', color: 'var(--color-slate-gray)', fontStyle: 'italic', marginBottom: '2px' }}>
                  {selectedDisease?.pathogen}
                </div>

                <div style={{ fontSize: '12.5px', color: 'var(--color-slate-gray)' }}>
                  {selectedDisease?.nameUrdu}
                </div>
              </div>
            </div>

            {/* Symptoms note */}
            <div style={{
              fontSize: '12.5px',
              color: 'var(--color-ink-black)',
              lineHeight: 1.45,
              marginBottom: '16px',
              padding: '10px 12px',
              borderRadius: '8px',
              backgroundColor: '#ffffff',
              border: '1px solid rgba(23, 25, 28, 0.06)'
            }}>
              <span style={{ fontWeight: 600, color: 'var(--color-slate-gray)' }}>Symptoms: </span>
              {selectedDisease?.symptoms}
            </div>

            {/* Prescription Box */}
            <div style={{
              backgroundColor: '#ffffff',
              border: '1px solid rgba(26, 67, 46, 0.2)',
              borderRadius: '10px',
              padding: '14px',
              marginBottom: '16px'
            }}>
              <div style={{
                fontSize: '10.5px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                color: 'var(--color-pine-green)',
                marginBottom: '6px'
              }}>
                SKUAST-K Recommended Cure
              </div>

              <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-ink-black)', marginBottom: '4px' }}>
                {selectedDisease?.primaryCure}
              </div>

              <div style={{ fontSize: '12.5px', color: 'var(--color-ink-black)', marginBottom: '4px' }}>
                Dosage: <strong style={{ color: 'var(--color-pine-green)' }}>{selectedDisease?.dosageRate}</strong>
              </div>

              <div style={{ fontSize: '11.5px', color: 'var(--color-slate-gray)' }}>
                Stage: {selectedDisease?.sprayStage}
              </div>

              {selectedDisease?.mixingNotice && (
                <div style={{
                  fontSize: '11px',
                  color: 'var(--color-sienna, #5d2a1a)',
                  marginTop: '8px',
                  paddingTop: '8px',
                  borderTop: '1px dashed rgba(23, 25, 28, 0.08)'
                }}>
                  Note: {selectedDisease.mixingNotice}
                </div>
              )}
            </div>
          </div>

          {/* Action Row */}
          <div>
            <button
              type="button"
              onClick={handleApplyToCalculator}
              style={{
                width: '100%',
                padding: '12px 18px',
                backgroundColor: isCurrentProductSelected ? '#15803d' : 'var(--color-pine-green)',
                color: '#ffffff',
                fontWeight: 600,
                fontSize: '13.5px',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                marginBottom: '10px',
                transition: 'background-color 0.15s ease'
              }}
            >
              <Zap size={15} />
              <span>
                {isCurrentProductSelected
                  ? '✓ Chemical Selected in Calculator Below'
                  : `Calculate Tank Dosage for ${selectedDisease?.name}`}
              </span>
              <ArrowRight size={14} />
            </button>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button
                type="button"
                onClick={handleCopyDiagnosis}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-slate-gray)',
                  fontSize: '12px',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '4px 0'
                }}
              >
                {copiedDiagnosis ? <Check size={13} color="green" /> : <Copy size={13} />}
                <span>{copiedDiagnosis ? 'Copied' : 'Copy summary'}</span>
              </button>

              <button
                type="button"
                onClick={handleWhatsAppConsult}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-pine-green)',
                  fontSize: '12px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '4px 0'
                }}
              >
                <MessageSquare size={13} />
                <span>Ask Chemist on WhatsApp</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

LeafDiseaseDetector.propTypes = {
  onApplyDosage: PropTypes.func,
  selectedProductId: PropTypes.string
};
