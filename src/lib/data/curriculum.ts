import { Path } from '../types';

export const curriculum: Path[] = [
  {
    id: 'foundation',
    name: "The Apprentice's Trials",
    description: 'Strictly linear. All users must complete this to prove basic competency.',
    chapters: [
      {
        id: 'chapter-1',
        title: 'Awakening the Eye',
        goal: 'Surviving the UI and basic navigation.',
        missions: [
          {
            id: 'mission-1-1',
            title: 'The Blank Scroll',
            xp: 100,
            intel: "Without the ritual of 'Make PolyMesh3D', the clay remains dead stone. You cannot shape what has no soul. Press the Comma Key (,) to hide the Lightbox.",
            task: "Hide the Lightbox. Draw a Cylinder3D. Enter Edit Mode (T). Click 'Make PolyMesh3D'.",
          },
          {
            id: 'mission-1-2',
            title: 'The Astral Projection',
            xp: 200,
            intel: 'To shape the object, you must become the camera. Right-click empty space to Rotate. Alt+Right-click to Pan.',
            task: 'Rotate 360 degrees. Pan to corner. Zoom in until it fills the screen.',
          },
        ],
        trainingMontage: {
          title: 'The Dizzy Pilot',
          xp: 300,
          drill: 'For 5 minutes: Top View (Snap Shift) -> Pan Bottom Right -> Frame (F) -> Side View -> Zoom In -> Frame. Repeat.',
        },
        boss: {
          title: 'THE WATCHER',
          xp: 500,
          test: 'Precision camera control.',
          winCondition: 'Orient Cylinder to view Top Cap, Side, and Bottom perfectly flat using camera snaps.',
        },
      },
      {
        id: 'chapter-2',
        title: 'The Primordial Clay',
        goal: 'Brush control and additive sculpting.',
        missions: [
          {
            id: 'mission-2-1',
            title: 'The Shapeless Form',
            xp: 250,
            intel: 'Seek the silhouette. The Move spell (B-M-V) shifts mass without adding matter.',
            task: 'Turn a sphere into a random lumpy potato shape using only Move.',
          },
          {
            id: 'mission-2-2',
            title: 'Runes of Power',
            xp: 300,
            intel: 'Clay Buildup (B-C-B) is the hammer. Add strips to build; hold Alt to carve.',
            task: 'Sculpt the letter "A" on your potato. Use Alt to dig the hole.',
          },
          {
            id: 'mission-2-3',
            title: 'The Banishing',
            xp: 200,
            intel: 'Hold Shift to invoke the Banishing (Smooth). Overuse will erase details.',
            task: 'Smooth the "A" until it disappears.',
          },
        ],
        trainingMontage: {
          title: 'Scribble & Erase',
          xp: 400,
          drill: 'Sculpt a letter. Smooth it away. Repeat for the whole alphabet.',
        },
        boss: {
          title: 'THE TOTEM OF THREE',
          xp: 600,
          test: 'Sculpt 3 distinct shapes on one sphere stack.',
          winCondition: 'Square base, Round middle, Pyramid top. All from one sphere using Move, Clay, Smooth.',
        },
      },
      {
        id: 'chapter-3',
        title: 'The Eternal Forge',
        goal: 'Dynamesh and Topology.',
        missions: [
          {
            id: 'mission-3-1',
            title: 'Stretching the Soul',
            xp: 250,
            intel: "See the geometry scream? This is 'Bad Topology'. You cannot carve runes into stretched soul-fabric.",
            task: 'Pull a spike until polygons stretch and break.',
          },
          {
            id: 'mission-3-2',
            title: 'The Rebirth Ritual',
            xp: 400,
            intel: 'Invoke Dynamesh to redistribute matter. Ctrl+Drag in the void.',
            task: 'Enable Dynamesh. Re-mesh the object. Smooth the spike.',
          },
          {
            id: 'mission-3-3',
            title: 'Resolution Roulette',
            xp: 300,
            intel: 'A side quest to understand resolution.',
            task: 'Dynamesh at 32 Res vs 512 Res. Observe wireframe (Shift+F).',
          }
        ],
        boss: {
          title: 'THE CHAOS SPIRE',
          xp: 750,
          test: 'Abstract sculpture with twisting branches.',
          winCondition: 'Pull branch -> Dynamesh -> Smooth -> Repeat. Mesh must remain clean.',
        },
      },
      {
        id: 'chapter-4',
        title: 'The Binding Spell',
        goal: 'Masking.',
        missions: [
          {
            id: 'mission-4-1',
            title: 'The Shadow Glyph',
            xp: 300,
            intel: 'Where shadow falls, clay is frozen. Hold Ctrl to paint Mask.',
            task: 'Mask half a sphere. Deform the other half.',
          },
          {
            id: 'mission-4-2',
            title: 'The Inversion',
            xp: 250,
            intel: 'To shape the shadow, invert the world. Ctrl+Click background.',
            task: 'Mask a spot. Invert. Pull out. Clear Mask (Ctrl+Drag BG).',
          },
        ],
        trainingMontage: {
          title: 'The Tiger Ball',
          xp: 500,
          drill: 'Mask stripe -> Invert -> Pull -> Clear. Repeat 20 times.',
        },
        boss: {
          title: 'THE SPIRIT CHAIN',
          xp: 1000,
          test: 'Create two interlinked rings from a single sphere.',
          winCondition: 'Use masks to protect one ring while shaping the other.',
        },
      },
      {
        id: 'chapter-5',
        title: "The Golem's Assembly",
        goal: 'Subtools and Gizmo.',
        missions: [
          {
            id: 'mission-5-1',
            title: 'Conjuring Parts',
            xp: 350,
            intel: "A Golem is many pieces. Use 'Append' to summon new matter.",
            task: 'Append a Cube and Cylinder.',
          },
          {
            id: 'mission-5-2',
            title: 'Telekinesis',
            xp: 350,
            intel: 'Press W for the Gizmo. Arrows move. Rings rotate. Squares scale.',
            task: 'Pierce the cylinder through the cube using Gizmo.',
          },
          {
            id: 'mission-5-3',
            title: "The Wizard's Hat",
            xp: 250,
            intel: 'A side quest to practice placement.',
            task: 'Append a Cone. Place it perfectly on top of the Sphere.',
          },
        ],
        boss: {
          title: 'THE STONE GOLEM',
          xp: 1200,
          test: 'Robot blockout using only primitives.',
          winCondition: 'Head, Eyes, Neck, Body, Arms (10+ Subtools). Perfect placement.',
        },
      },
    ],
  },
  {
    id: 'organic',
    name: 'Order of the Vitalist',
    description: 'Organic Path',
    chapters: [
        {
            id: 'chapter-6a',
            title: 'The Cursed Skull',
            goal: 'Sculpting a skull.',
            missions: [
                { id: 'mission-a-1', title: 'The Egg', xp: 300, intel: 'Reshape sphere into cranial egg.', task: 'Use the move brush to shape a sphere into an egg-like cranium shape.' },
                { id: 'mission-a-2', title: 'The Eye Sockets', xp: 350, intel: 'Dig deep sockets (eyes are holes).', task: 'Use the claybuildup brush with alt held down to carve out eye sockets.' },
                { id: 'mission-a-3', title: 'The Jaw Connection', xp: 400, intel: 'Sculpt jawline connecting to ear.', task: 'Build up the jawline from the chin to where the ear would be.' },
            ],
            boss: {
                title: 'THE SKULL',
                xp: 800,
                test: 'Readable skull with sockets, nasal cavity, cheekbones.',
                winCondition: 'Create a skull that is anatomically believable with all the major landmarks.'
            }
        },
        {
            id: 'chapter-7a',
            title: 'Faces of the Old Gods',
            goal: 'Sculpting a human face.',
            missions: [
                { id: 'mission-a-4', title: 'The Eyeball Insertion', xp: 300, intel: 'Append spheres into sockets.', task: 'Append new sphere subtools and place them in the eye sockets.' },
                { id: 'mission-a-5', title: 'The Nose Pyramid', xp: 350, intel: 'Add nose (pyramid shape).', task: 'Build up the nose, focusing on the basic pyramid shape.' },
                { id: 'mission-a-6', title: 'The Mouth Barrel', xp: 400, intel: 'Sculpt muzzle, cut mouth line.', task: 'Build up the muzzle of the mouth and carve in the lip line.' },
            ],
            boss: {
                title: 'THE HERO\'S BUST',
                xp: 1000,
                test: 'Generic human head with good proportions.',
                winCondition: 'Create a well-proportioned human head bust.'
            }
        }
    ]
  },
  {
    id: 'hardsurface',
    name: 'Order of the Iron Smith',
    description: 'Hard Surface Path',
    chapters: [
        {
            id: 'chapter-6b',
            title: 'Planar Discipline',
            goal: 'Creating clean, flat surfaces.',
            missions: [
                { id: 'mission-b-1', title: 'HPolish', xp: 300, intel: 'Turn sphere into perfect Cube.', task: 'Use the HPolish brush to flatten the sides of a sphere into a cube.' },
                { id: 'mission-b-2', title: 'TrimDynamic', xp: 350, intel: 'Bevel edges like worn stone.', task: 'Use the TrimDynamic brush to create beveled edges on your cube.' },
                { id: 'mission-b-3', title: 'ClipCurve', xp: 400, intel: 'Slice clean angles (Ctrl+Shift).', task: 'Use the ClipCurve brush to slice sharp angles into your object.' },
            ],
            boss: {
                title: 'THE RUNE STONE',
                xp: 800,
                test: 'Floating obelisk with flat sides and runes.',
                winCondition: 'Create an obelisk with perfectly flat planes and carved runes.'
            }
        },
        {
            id: 'chapter-7b',
            title: 'The Dwarven Mechanism',
            goal: 'Using booleans for complex shapes.',
            missions: [
                { id: 'mission-b-4', title: 'Live Boolean', xp: 300, intel: 'Set cylinder to Subtraction. View hole.', task: 'Use Live Booleans to subtract a shape from another.' },
                { id: 'mission-b-5', title: 'The Boolean Mesh', xp: 350, intel: 'Make Boolean Mesh to solidify geometry.', task: 'Create a new mesh from the boolean operation.' },
            ],
            boss: {
                title: 'THE PALADIN\'S HELM',
                xp: 1000,
                test: 'Helmet with visor slot and vents using Booleans.',
                winCondition: 'Create a helmet using booleans for the visor and other features.'
            }
        }
    ]
  },
  {
    id: 'stylized',
    name: 'Order of the Illusionist',
    description: 'Stylized Path',
    chapters: [
        {
            id: 'chapter-6c',
            title: 'The Clean Line',
            goal: 'Creating clean, stylized sculpts.',
            missions: [
                { id: 'mission-c-1', title: 'LazyMouse', xp: 300, intel: 'Draw smooth lines (L key).', task: 'Use the LazyMouse feature to draw long, smooth strokes.' },
                { id: 'mission-c-2', title: 'The Orb Crack', xp: 350, intel: 'Cut crack with DamStandard, tighten with Pinch.', task: 'Use DamStandard and Pinch to create sharp, stylized cracks.' },
                { id: 'mission-c-3', title: 'The Soft Bevel', xp: 400, intel: 'Flatten top gently with Polish brush.', task: 'Use the Polish brush to create soft, clean bevels.' },
            ],
            boss: {
                title: 'THE DUNGEON KEY',
                xp: 800,
                test: 'Chunky fantasy key with clean bevels.',
                winCondition: 'Create a stylized key with clean lines and bevels.'
            }
        },
        {
            id: 'chapter-7c',
            title: 'Enchanted Items',
            goal: 'Sculpting stylized props.',
            missions: [
                { id: 'mission-c-4', title: 'Thick & Thin', xp: 300, intel: 'Bend a cone (thick base, sharp tip).', task: 'Create interesting shapes by varying the thickness of your sculpts.' },
                { id: 'mission-c-5', title: 'Stylized Hair', xp: 350, intel: 'Sculpt "shark fin" hair lock.', task: 'Sculpt stylized hair using simple, clean shapes.' },
            ],
            boss: {
                title: 'THE ALCHEMIST\'S FLASK',
                xp: 1000,
                test: 'Potion bottle with cork and strap. Readable silhouette.',
                winCondition: 'Create a stylized flask with a strong, readable silhouette.'
            }
        }
    ]
  },
  {
    id: 'maker',
    name: 'Order of the Transmuter',
    description: 'Maker Path',
    chapters: [
        {
            id: 'chapter-6d',
            title: 'The Solid Form',
            goal: 'Preparing models for 3D printing.',
            missions: [
                { id: 'mission-d-1', title: 'Watertightness', xp: 300, intel: 'Use Close Holes.', task: 'Ensure your model is watertight and has no holes.' },
                { id: 'mission-d-2', title: 'Wall Thickness', xp: 350, intel: 'Thicken thin parts with Inflate.', task: 'Use the Inflate brush to add thickness to thin parts of your model.' },
                { id: 'mission-d-3', title: 'Decimation Master', xp: 400, intel: 'Reduce polycount.', task: 'Use Decimation Master to reduce the polycount of your model while preserving detail.' },
            ],
            boss: {
                title: 'THE PRINTABLE TOKEN',
                xp: 800,
                test: 'Embossed coin, flat bottom, watertight.',
                winCondition: 'Create a 3D printable coin with embossed details.'
            }
        },
        {
            id: 'chapter-7d',
            title: 'The Engineer\'s Joint',
            goal: 'Creating functional 3D printed parts.',
            missions: [
                { id: 'mission-d-4', title: '3D Print Hub', xp: 300, intel: 'Set size to 50mm.', task: 'Use the 3D Print Hub to set the dimensions of your model.' },
                { id: 'mission-d-5', title: 'The Keying', xp: 350, intel: 'Create square peg/hole fit.', task: 'Create keys and sockets to join multiple 3D printed parts.' },
            ],
            boss: {
                title: 'THE MINIATURE FIGURINE',
                xp: 1000,
                test: 'Character cut into 3 parts with keys.',
                winCondition: 'Create a multi-part miniature with keys for assembly.'
            }
        }
    ]
  },
  {
    id: 'mastery',
    name: 'Ascension',
    description: 'Converges back. All users perform these tasks.',
    chapters: [
        {
            id: 'chapter-9',
            title: 'The Purification',
            goal: 'Creating clean topology for production.',
            missions: [
                { id: 'mission-9-1', title: 'The Cleanse', xp: 500, intel: 'ZRemesher for low poly.', task: 'Use ZRemesher to create a low-poly version of your model with clean topology.' },
                { id: 'mission-9-2', title: 'The Projection', xp: 500, intel: 'ProjectAll to transfer details.', task: 'Project the details from your high-poly sculpt onto your new low-poly mesh.' },
            ],
            boss: {
                title: 'THE PERFECTED SCULPT',
                xp: 1500,
                test: 'A high-poly sculpt with a clean, low-poly, production-ready mesh.',
                winCondition: 'A fully-detailed sculpt with clean, efficient topology.'
            }
        },
        {
            id: 'chapter-10',
            title: 'The Grand Illusion',
            goal: 'Bringing your sculpt to life with color and light.',
            missions: [
                { id: 'mission-10-1', title: 'Coloring the Soul', xp: 500, intel: 'Polypaint (RGB).', task: 'Use Polypaint to add color to your model.' },
                { id: 'mission-10-2', title: 'The Light of Creation', xp: 500, intel: 'Lights & Materials.', task: 'Use lights and materials to render your sculpt.' },
            ],
            boss: {
                title: 'THE MASTERPIECE',
                xp: 5000,
                test: 'Sculpt, Polypaint, Light, Render, Export.',
                winCondition: 'Create a final, presentation-ready render of your masterpiece.'
            }
        }
    ]
  }
];
