# Brahmapradipam (ब्रह्मप्रदीपम्)

> "A lamp for illuminating Brahman"

A sacred digital library for serious seekers of **mokṣa** studying Advaita Vedānta under qualified guru guidance.

[![Live Site](https://img.shields.io/badge/Live-Site-saffron)](https://brahmapradipam.vercel.app)
[![GitHub](https://img.shields.io/github/stars/Devarajan89/brahmapradipam?style=social)](https://github.com/Devarajan89/brahmapradipam)

## 🕉️ About

Brahmapradipam is a reverent digital repository of sacred Advaita Vedānta texts with Ādi Śaṅkarācārya's bhāṣya (commentary). This platform serves as a **reference tool** for serious spiritual seekers who are studying under the guidance of a qualified guru in the traditional guru-śiṣya paramparā.

## ⚠️ Important Notice

**This is NOT:**
- ❌ An educational platform for casual learners
- ❌ A self-study course or tutorial
- ❌ A replacement for a living teacher
- ❌ For intellectual curiosity alone

**This IS:**
- ✅ A reference for seekers under guru guidance
- ✅ Support for daily sādhana and study
- ✅ A repository of authentic Advaita texts
- ✅ For serious mumukṣus (seekers of liberation)

## 📚 Available Texts

### ✓ Completed
- **Īśa Upaniṣad** (18 mantras) - Complete with Śaṅkara's bhāṣya
  - All 18 mantras with full commentary
  - Word-by-word analysis
  - Core concepts extracted

### 🔄 In Progress
- **Bhagavad Gītā**
  - Chapter 1: Arjunaviṣādayoga (47 verses) - Context only
  - Chapter 2: Sāṅkhyayoga (Verses 1-9, 16) - Partial with bhāṣya

### 🔜 Coming Soon
- More Principal Upaniṣads (Kena, Kaṭha, Muṇḍaka, Māṇḍūkya, etc.)
- Complete Bhagavad Gītā with bhāṣya
- Brahma Sūtras with bhāṣya

## 📖 Content Structure

Every verse includes these 8 sections in exact order:

1. **मूल श्लोक** (Original Sanskrit Verse) - Beautiful Devanāgarī presentation
2. **पदच्छेद** (Word-by-Word Analysis) - Interactive grammatical breakdown
3. **IAST Transliteration** - Romanized Sanskrit with diacritical marks
4. **अनुवाद** (Translation) - Clear English translations
5. **श्री शङ्कर भगवद्पाद भाष्य** (Śaṅkara Bhagavadpāda's Commentary) - **MOST IMPORTANT** - Original Sanskrit, IAST, and English translation
6. **मुख्य बोध** (Central Teaching) - Key spiritual message for contemplation
7. **तात्त्विक शब्द** (Core Concepts) - Interactive concept tags with definitions
8. **सम्बन्धित मन्त्र** (Related Verses) - Cross-references to similar teachings

## 🛠️ Technology Stack

- **Astro** - Modern static site generator
- **Tailwind CSS v4** - Styling with sacred design system
- **TypeScript** - Type-safe development

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
brahmapradipam/
├── src/
│   ├── pages/
│   │   ├── index.astro           # Homepage with disclaimer
│   │   ├── library.astro         # Library browser
│   │   ├── daily.astro           # Daily contemplation
│   │   ├── guidance.astro        # Guidance for newcomers
│   │   └── verse/
│   │       └── bg-2-16.astro     # Example verse page
│   ├── components/
│   │   ├── VerseDisplay.astro    # Main verse component
│   │   ├── SanskritText.astro    # Devanāgarī renderer
│   │   ├── WordAnalysis.astro    # Word-by-word breakdown
│   │   ├── Bhashya.astro         # Commentary section
│   │   ├── ConceptTag.astro      # Concept tags
│   │   └── RelatedVerses.astro   # Cross-references
│   ├── layouts/
│   │   └── BaseLayout.astro      # Base page layout
│   └── styles/
│       └── global.css            # Sacred design system
├── content/
│   ├── bhagavad-gita/
│   │   └── chapter-02/verses/16.json  # Example verse
│   ├── upanishads/
│   └── prakaranas/
└── public/
    └── fonts/                    # Sanskrit fonts
```

## 🎨 Design Philosophy

**Sacred, Minimal, Contemplative**

- No busy elements or distractions
- Generous whitespace
- Soft, warm colors (parchment, cream, saffron)
- No animations except gentle fades
- Typography that honors sacred texts
- **NO** gamification, progress bars, or social features

### Color Palette

```css
/* Light Mode */
--bg-primary: #FBF8F3      /* Soft parchment */
--bg-sanskrit: #FFF9F0     /* Warm tint for Devanāgarī */
--bg-bhashya: #F8F6F3      /* Special bg for commentary */
--accent-saffron: #D97706  /* Sacred saffron */
--accent-sandalwood: #92724F /* Warm brown */
```

## 📖 Content Format

Verses are stored as JSON files with this structure:

```json
{
  "id": "bg-2-16",
  "reference": "Bhagavad Gītā 2.16",
  "original": {
    "devanagari": "...",
    "iast": "..."
  },
  "wordAnalysis": [...],
  "translations": [...],
  "bhashya": {
    "sanskrit": "...",
    "iast": "...",
    "translation": "...",
    "notes": "..."
  },
  "centralTeaching": "...",
  "coreConcepts": [...],
  "relatedVerses": [...]
}
```

## ⚠️ Important Disclaimers

### On Every Page (Footer)
> These sacred texts are meant to be studied under the guidance of a qualified guru in the traditional guru-śiṣya paramparā. This platform provides access to scriptures but cannot provide the direct transmission of knowledge that comes only through a realized teacher.
> 
> श्री गुरुभ्यो नमः

### For New Visitors
A modal appears on first visit explaining:
- This is for serious seekers under guru guidance
- It cannot replace a living teacher
- Self-study alone can lead to misunderstanding
- Recommendations for finding a qualified guru

## 🚫 What NOT to Include

Never add these features:
- User accounts or authentication
- Social sharing buttons
- Comments or discussion forums
- Progress tracking or achievements
- Gamification elements
- Analytics beyond basic page views
- Any monetization features
- Advertisements
- Newsletter signups
- Community features
- Rating or voting systems

## 📚 Texts Included (Planned)

### Prasthāna Trayī (Triple Canon)
1. **Upaniṣads** - Īśa, Kena, Kaṭha, Praśna, Muṇḍaka, Māṇḍūkya, Taittirīya, Aitareya, Chāndogya, Bṛhadāraṇyaka
2. **Brahma Sūtras** - Complete with Śaṅkara Bhagavadpāda's bhāṣya
3. **Bhagavad Gītā** - All 18 chapters, 700 verses

### Prakaraṇa Granthas
- Vivekacūḍāmaṇi
- Tattvabodha
- Ātmabodha
- Aparokṣānubhūti
- Vākyavṛtti
- Pañcīkaraṇam
- Dṛg-Dṛśya-Viveka

## 🙏 Acknowledgments

This project is offered with reverence to:
- The unbroken lineage of teachers (guru-paramparā)
- Śrī Ādi Śaṅkara Bhagavadpāda
- All the ṛṣis who transmitted this sacred knowledge
- All qualified teachers preserving the tradition today

## 📄 License

This is a spiritual offering. All traditional texts and commentaries belong to the timeless Vedic tradition.

---

**श्री गुरुभ्यो नमः** 🙏
