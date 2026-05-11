// Course content for GT-05 — Centrifugal Compressor.
// All learning outcomes use measurable action verbs (consensus list, no
// banned verbs like "understand", "appreciate", etc.). Every section has at
// least one formative probe.

export const COURSE_META = {
  id: "gt-05",
  code: "GT-05",
  title: "Centrifugal Compressor — Aerodynamics, Design & Performance Map",
  subtitle: "Small Jet Engine Design Training | Bassam Track | 4.5 hr session",
  org: "ProReadyEngineer",
  durationMin: 270,
  prerequisites: [
    "GT-02 — Brayton cycle fundamentals",
    "GT-03 — single-shaft architecture & station numbering 0–8",
    "GT-04 — rotor dynamics, balancing, bearings",
  ],
  topLevelOutcomes: [
    { verb: "Define", text: "Define velocity vectors at the impeller inlet — absolute (C1), relative (W1), and tangential blade speed (U1) — and their geometric relationship." },
    { verb: "Calculate", text: "Calculate work input using the Euler turbomachinery equation P = ṁ·(U2·Cu2 − U1·Cu1) for shaft-to-fluid energy transfer." },
    { verb: "Apply", text: "Apply the Wiesner slip-factor correlation to estimate real-rotor whirl Cu2,real from blade geometry and blade count." },
    { verb: "Compare", text: "Compare aerodynamic function of vaned vs vaneless diffusers in converting kinetic energy to static pressure." },
    { verb: "Interpret", text: "Interpret compressor maps: identify the surge line, choke line, speed lines, and the engine's steady-state operating line." },
    { verb: "Distinguish", text: "Distinguish rotating stall from surge by signature, frequency, and required mitigation." },
    { verb: "Evaluate", text: "Evaluate a candidate impeller (D2, RPM, β2, z) against the 700 N reference engine targets and flag where it will fail first." },
  ],
};

// Reference-engine constants used everywhere.
export const REFERENCE_ENGINE = {
  label: "700 N small turbojet (reference design)",
  thrust_N: 700,
  mDot_kgs: 0.85,
  PR_target: 3.5,
  eta_c_target: 0.78,
  N_rpm: 80000,
  D2_m: 0.080,
  TET_C: 950,
  // derived
  get U2_mps() { return Math.PI * this.D2_m * this.N_rpm / 60; }, // ≈ 335 m/s
};

// 11 sections from the PDF, with concept cards + probes.
export const SECTIONS = [
  // ─── 1 ────────────────────────────────────────────────────────────────
  {
    id: "s1",
    number: 1,
    title: "Where this session fits in the course",
    subtitle: "From inlet basics to the engine's pressure-gain workhorse.",
    outcomes: [
      { verb: "Locate", text: "Locate the centrifugal stage within the gas-path station numbering (Stations 2 → 3) and within the GT-02 → GT-16 curriculum." },
      { verb: "State", text: "State the pressure-ratio band a single radial stage delivers in this engine class (2.0–4.5)." },
    ],
    cards: [
      {
        id: "s1-c1",
        heading: "The pressure-gain workhorse",
        body: "In small turbojets, the centrifugal compressor is the heart of the Brayton cycle. It takes ambient air and elevates its energy state enough to support high-intensity combustion. Without a sustained, efficient pressure rise the cycle never closes and the engine is a collection of stationary parts.",
        bullets: [
          "The compressor's exit conditions (P3, T3, C3) directly fix the combustor's design constraints.",
          "Mastery of this stage is the prerequisite for any work in combustor (GT-06) or turbine (GT-08) design.",
        ],
      },
      {
        id: "s1-c2",
        heading: "Where GT-05 sits",
        body: "GT-05 covers how the centrifugal stage delivers the 2.0:1 to 4.5:1 pressure ratio required between Stations 2 and 3 for thermal efficiency at this scale.",
        bullets: [
          "Prior — GT-02 (Brayton cycle), GT-03 (single-shaft architecture, station numbering 0–8), GT-04 (rotor dynamics, balancing).",
          "Next — GT-06 covers how the compressed air at Station 3 is mixed with fuel in the evaporative-tube combustor.",
        ],
      },
      {
        id: "s1-c3",
        heading: "Reference engine — the 700 N spec block",
        body: "Throughout the deck a single reference engine anchors every numerical example. Commit it to memory.",
        bullets: [
          "Class: single-shaft turbojet, sea-level static thrust ≈ 700 N",
          "Mass flow: ṁ = 0.85 kg/s at design point",
          "Pressure ratio: PR = P03/P02 = 3.5",
          "Compressor isentropic efficiency: ηc = 0.78",
          "Shaft speed: N = 80 000 rpm",
          "Impeller: D2 = 80 mm → U2 = π·D2·N/60 ≈ 335 m/s",
          "Turbine entry temperature: TET ≈ 950 °C",
        ],
      },
    ],
    probes: [
      {
        id: "s1-p1",
        type: "mcq",
        kind: "concept",
        stem: "In the gas-path station numbering used in this engine, Station 3 refers to:",
        options: [
          "The compressor inlet",
          "The compressor exit / combustor inlet",
          "The turbine NGV inlet",
          "The nozzle exit",
        ],
        correct: 1,
        explain: "Station 3 is the compressor exit, which is also the combustor inlet. The compressor inlet is Station 2; turbine NGV inlet is Station 4; nozzle exit is Station 8.",
      },
      {
        id: "s1-p2",
        type: "mcq",
        kind: "application",
        stem: "A single-stage centrifugal compressor in this engine class typically delivers what pressure-ratio range?",
        options: [
          "1.1 – 1.5",
          "2.0 – 4.5",
          "5 – 8",
          "10 – 15",
        ],
        correct: 1,
        explain: "A single radial stage delivers PR ≈ 2.0–4.5. Matching this with axial stages would need 3+ stages — which is why radial wins at this scale.",
      },
    ],
  },

  // ─── 2 ────────────────────────────────────────────────────────────────
  {
    id: "s2",
    number: 2,
    title: "Prerequisite recap — open gas turbine process",
    subtitle: "The continuous-flow principle and isobaric heating.",
    outcomes: [
      { verb: "Distinguish", text: "Distinguish the gas-turbine isobaric heating phase from the piston-engine cyclic pressure rise." },
      { verb: "Classify", text: "Classify a given rotor as axial, radial, or mixed-flow from its inlet/exit flow geometry." },
      { verb: "Justify", text: "Justify the choice of a radial stage over an axial stage for a small turbojet at this size class." },
    ],
    cards: [
      {
        id: "s2-c1",
        heading: "Continuous energy cycle",
        body: "The open gas-turbine process is a continuous energy cycle: air is ingested, compressed, heated at constant pressure, then expanded. The fundamental difference from a piston engine is the heating phase — pistons rely on an explosive pressure rise inside a closed cylinder; gas turbines use isobaric heating where pressure stays roughly constant (minor flow losses only) while temperature and volume rise.",
        bullets: [
          "Practical consequence: the combustor is a thin-walled flow tube, not a thick pressure vessel.",
        ],
      },
      {
        id: "s2-c2",
        heading: "Three compressor categories",
        body: "Each architecture has a sweet spot in size and pressure-ratio space.",
        bullets: [
          "Axial — flow parallel to the shaft through multiple stages of rotating + stationary blades.",
          "Radial (centrifugal) — air enters axially, is flung outward perpendicular to the shaft by centrifugal force.",
          "Mixed flow — hybrid, broadly axial but with steadily increasing diameter.",
        ],
      },
      {
        id: "s2-c3",
        heading: "Why radial wins at small scale",
        body: "A single radial stage achieves PR = 2.0–4.5 versus PR ≈ 1.2–1.5 per axial stage. So the radial keeps model engines compact without the assembly complexity of multi-stage axial rotors. It is also simpler to manufacture (one impeller wheel sourced from automotive turbocharger production) and more robust.",
      },
    ],
    probes: [
      {
        id: "s2-p1",
        type: "mcq",
        kind: "concept",
        stem: "Why is the gas-turbine process called 'isobaric' relative to the piston engine cycle?",
        options: [
          "Volume stays constant during combustion",
          "Combustion occurs at approximately constant pressure; only temperature rises",
          "Pressure rises sharply at the moment of ignition like in a piston engine",
          "The compressor and turbine spin at the same speed",
        ],
        correct: 1,
        explain: "Isobaric = constant pressure during heat addition. Pressure is held roughly constant by the steady flow through the combustor; the only pressure change is small flow losses. This is why the combustor can be a thin-walled flow tube rather than a pressure vessel.",
      },
      {
        id: "s2-p2",
        type: "mcq",
        kind: "application",
        stem: "You are designing a 700 N turbojet that must fit in a 110 mm diameter envelope. You need PR ≈ 3.5. Which architecture is the right call?",
        options: [
          "Single-stage axial — simplest and most efficient at all sizes",
          "Single-stage centrifugal — gets you PR 3.5 in one stage",
          "Three-stage axial — needed to reach PR 3.5",
          "Mixed-flow — only choice that fits the diameter",
        ],
        correct: 1,
        explain: "Single-stage centrifugal delivers PR 2.0–4.5 in one stage, fits the envelope, and is the standard choice in this class. Three axial stages would deliver PR 3.5 but at much higher manufacturing complexity.",
      },
    ],
  },

  // ─── 3 ────────────────────────────────────────────────────────────────
  {
    id: "s3",
    number: 3,
    title: "Impeller aerodynamics & velocity triangles",
    subtitle: "How shaft energy becomes kinetic and pressure energy.",
    outcomes: [
      { verb: "Define", text: "Define the absolute (C), relative (W), and blade (U) velocity vectors at the impeller eye and tip." },
      { verb: "Calculate", text: "Calculate U at any radius and RPM using U = π·D·N/60." },
      { verb: "Apply", text: "Apply the Euler equation w = U2·Cu2 − U1·Cu1 with axial-inlet simplification (Cu1 = 0)." },
      { verb: "Differentiate", text: "Differentiate backswept (β2 < 90°) from radial (β2 = 90°) blade exit geometries by work transfer and operability." },
    ],
    cards: [
      {
        id: "s3-c1",
        heading: "Three velocity vectors at a station",
        body: "At any point on the rotor we have three vectors:",
        bullets: [
          "Absolute velocity C — what an observer in the lab frame sees. Direction set by blade exit angle plus slip.",
          "Relative velocity W — what an observer riding on the rotor sees. Aligned (mostly) with the blade.",
          "Blade tip speed U — purely tangential, magnitude = ω·r at the local radius.",
          "Vector relation: C = U + W. This bridges the rotating and stationary frames.",
          "Notation — Cw (whirl) = Cu (tangential) = the swirl component of C; both symbols are used interchangeably.",
          "Subscripts 1 = impeller eye (inlet), 2 = impeller tip (exit). Do NOT confuse with gas-path stations 1 and 2.",
        ],
      },
      {
        id: "s3-c2",
        heading: "Inlet (impeller eye) triangle",
        body: "At the eye, absolute C1 is axial (no pre-swirl in this design). Blade speed U1 = ω·r1 is small because the eye radius is small. The relative W1 = C1 − U1 has both axial and tangential components, and the leading-edge angle β1 = atan(U1/Ca1) sets the inducer blade shape.",
      },
      {
        id: "s3-c3",
        heading: "Exit (impeller tip) triangle",
        body: "At the tip, U2 is much larger than U1 because the radius is bigger. W2 aligns with the trailing-edge angle β2 (typically backswept). The absolute C2 = W2 + U2 has a large tangential component Cu2 — the whirl — which carries energy into the diffuser.",
        bullets: [
          "Ideal (no slip): Cu2 = U2.",
          "Real: Cu2 = σ·U2 where σ < 1 is the slip factor.",
          "Specific work (Euler equation, axial inlet): w = U2·Cu2. With slip σ: w = σ·U2².",
        ],
      },
      {
        id: "s3-c4",
        heading: "Backswept vs radial blades — operability vs work",
        body: "Convention here: β2 is measured from the tangential direction. Radial blade → β2 = 90°. Backswept → β2 ≈ 60–75°.",
        bullets: [
          "Radial (β2 = 90°) — max work transfer per kg, but unstable map.",
          "Backswept (β2 = 60–75°) — slightly less work, but much wider stable operating range.",
          "Most modern small turbojets (AMT, JetCat in this size class) use β2 ≈ 60–65°.",
          "Watch out — Wiesner's formula uses β2′ measured from the radial direction. β2′ = 90° − β2.",
        ],
      },
    ],
    probes: [
      {
        id: "s3-p1",
        type: "mcq",
        kind: "concept",
        stem: "Two of the three velocity vectors at a rotor station are the absolute C and blade speed U. What is the third?",
        options: [
          "The Mach number M",
          "The whirl Cu",
          "The relative velocity W",
          "The stagnation pressure P0",
        ],
        correct: 2,
        explain: "C = U + W. The three are absolute (lab frame), relative (rotor frame), and blade speed (purely tangential). Cu is the tangential component of C, not a separate vector.",
      },
      {
        id: "s3-p2",
        type: "mcq",
        kind: "application",
        stem: "For the 700 N reference engine (D2 = 80 mm, N = 80 000 rpm), the impeller tip speed U2 is approximately:",
        options: [
          "67 m/s",
          "210 m/s",
          "335 m/s",
          "450 m/s",
        ],
        correct: 2,
        explain: "U2 = π·D2·N/60 = π · 0.080 · (80000/60) ≈ 335 m/s. That sits near Mach 0.99 in sea-level dry air — high subsonic, on the edge of shock-loss territory.",
      },
      {
        id: "s3-p3",
        type: "mcq",
        kind: "analysis",
        stem: "An impeller is changed from radial blades (β2 = 90°) to backswept (β2 = 65°) at the same RPM and diameter. Which is the BEST description of the resulting trade-off?",
        options: [
          "Lower specific work, wider stable operating range",
          "Higher specific work, narrower stable operating range",
          "Lower specific work, narrower stable operating range",
          "Higher specific work, wider stable operating range",
        ],
        correct: 0,
        explain: "Backsweep reduces Cu2 (because relative flow leaves at an angle pointing partly opposite to U2), so w = U2·Cu2 drops. In exchange the surge line moves left → wider stable range. This is the standard small-turbojet compromise.",
      },
    ],
  },

  // ─── 4 ────────────────────────────────────────────────────────────────
  {
    id: "s4",
    number: 4,
    title: "Gap losses and enclosed rotors",
    subtitle: "The clearance design problem.",
    outcomes: [
      { verb: "Explain", text: "Explain why a tip-clearance gap larger than ~0.5 mm causes a roughly linear fall in stage efficiency." },
      { verb: "State", text: "State the standard cold-clearance target window (0.3–0.5 mm) and the failure modes outside that window." },
      { verb: "Compare", text: "Compare open vs enclosed (covered) rotors by maximum achievable RPM and gap-loss sensitivity." },
    ],
    cards: [
      {
        id: "s4-c1",
        heading: "What gap loss is",
        body: "Gap loss is the air that slips through the clearance between the impeller tip and the housing without doing useful work. The high-pressure exit side drives leakage flow back to the low-pressure inlet over the blade tip. The relationship is roughly linear: each extra 0.1 mm of gap costs about 1 percentage point of stage efficiency.",
      },
      {
        id: "s4-c2",
        heading: "The 0.3–0.5 mm cold-clearance window",
        body: "Sweet-spot target for small turbojets: 0.3 to 0.5 mm cold.",
        bullets: [
          "Below 0.3 mm: thermal expansion of the rotor on start-up exceeds the cold gap → rotor jam, engine refuses to spin or rubs on first start.",
          "0.3–0.5 mm: balanced efficiency + thermal robustness.",
          "Above 0.5 mm: efficiency penalty prohibitive.",
          "≥ 1.0 mm: engine often cannot sustain its own rotation.",
        ],
      },
      {
        id: "s4-c3",
        heading: "Enclosed rotors (Schreckling FD)",
        body: "Gap losses can be 'avoided almost completely' by using an enclosed rotor wheel with a cover plate over the blades — a hallmark of Kurt Schreckling's early FD series. The trade-off is lower max RPM, because the cover plate adds mass and centrifugal stress at the rim. Modern designs prefer open rotors with carefully managed clearance for higher RPM.",
      },
    ],
    probes: [
      {
        id: "s4-p1",
        type: "mcq",
        kind: "concept",
        stem: "Which of the following is the BEST reason a tip clearance below 0.3 mm is risky on a small turbojet?",
        options: [
          "It increases gap leakage and lowers efficiency",
          "Differential thermal expansion of the rotor on start-up can exceed the cold gap, causing the rotor to rub",
          "It violates aerodynamic similarity laws",
          "It pushes the impeller above its critical speed",
        ],
        correct: 1,
        explain: "Smaller gaps are generally GOOD for efficiency. The problem is thermal: the rotor heats faster than the housing on start-up, so the running gap shrinks. A gap that's too tight cold becomes negative hot → rotor rub.",
      },
      {
        id: "s4-p2",
        type: "mcq",
        kind: "evaluation",
        stem: "An engine is measured at assembly with a 1.2 mm cold tip clearance. What is the expected outcome on the first attempted run?",
        options: [
          "Slightly reduced PR, otherwise normal operation",
          "PR drops to about 70% of design",
          "Engine cannot sustain its own rotation",
          "Engine surges immediately on startup",
        ],
        correct: 2,
        explain: "1.2 mm is beyond the 1.0 mm cliff. So much of the work goes into recirculated leakage that the rotor cannot extract enough net work to overcome bearing and windage losses. The engine hangs at sub-sustain speed and flames out.",
      },
    ],
  },

  // ─── 5 ────────────────────────────────────────────────────────────────
  {
    id: "s5",
    number: 5,
    title: "The diffuser system",
    subtitle: "Converting kinetic energy to static pressure.",
    outcomes: [
      { verb: "Explain", text: "Explain how the diffuser converts kinetic energy at the impeller exit into static pressure via Bernoulli's equation." },
      { verb: "Compare", text: "Compare vaned and vaneless diffusers by pressure recovery and stable operating range." },
      { verb: "Apply", text: "Apply the pressure-recovery coefficient Cp = (P_exit − P_inlet) / (½ρV²_inlet) to estimate diffuser performance." },
    ],
    cards: [
      {
        id: "s5-c1",
        heading: "What the diffuser does",
        body: "Air exiting the impeller has high kinetic energy but insufficient static pressure for combustion. The diffuser converts that velocity into pressure via gradual area increase (a diverging passage). Bernoulli at work: ½ρV² → P as V decreases. Roughly 25–30% of the stage PR comes from this conversion in a typical small turbojet.",
      },
      {
        id: "s5-c2",
        heading: "Vaned vs vaneless",
        body: "Two construction families:",
        bullets: [
          "Vaneless — annular space, no vanes. Flow follows the free-vortex law r·Cw = constant. Simple, robust, wide stable range, lower Cp.",
          "Vaned — ring of stationary vanes turns the flow more aggressively. Higher pressure recovery but narrower stable range.",
          "Small turbojets often use vaneless or short-vaned diffusers for operability margin.",
        ],
      },
      {
        id: "s5-c3",
        heading: "Pressure-recovery coefficient Cp",
        body: "Cp quantifies how well the diffuser converts dynamic head to static rise.",
        bullets: [
          "Cp = (P_exit − P_inlet) / (½ρ·V²_inlet) — fraction of inlet kinetic energy recovered as pressure.",
          "Ideal Cp = 1 (all KE converted).",
          "Real Cp = 0.6–0.8 typical. Losses come from skin friction and any boundary-layer separation in the divergent passage.",
        ],
      },
      {
        id: "s5-c4",
        heading: "Diffuser sizing rules of thumb",
        body: "Practical constraints in this engine class:",
        bullets: [
          "Total divergence angle: < 7° per side to avoid separation.",
          "Length: 2–3× the inlet width minimum.",
          "Inlet velocity (impeller exit): C2 ≈ 350–450 m/s.",
          "Exit velocity (combustor inlet): C3 ≈ 100–150 m/s — slow enough for combustion to anchor.",
          "Vane count if vaned: 13–21 typical.",
        ],
      },
      {
        id: "s5-c5",
        heading: "Compact 'two-ring' diffuser trick",
        body: "Many successful designs (JPX T240, the full-scale Turbomeca Marbore) use a two-ring diffuser system: a radial ring then an axial ring. The 90° turn from radial to axial flow keeps the engine slim and minimises frontal area for high-speed flight. Both rings together do the diffusion work that a single long radial passage would otherwise do.",
      },
    ],
    probes: [
      {
        id: "s5-p1",
        type: "mcq",
        kind: "concept",
        stem: "A diffuser converts kinetic energy into static pressure. The underlying physical principle is:",
        options: [
          "Newton's third law (action-reaction)",
          "Bernoulli's principle (½ρV² + P = constant, ignoring losses)",
          "The Carnot efficiency limit",
          "Adiabatic compression of the fluid by the casing walls",
        ],
        correct: 1,
        explain: "Bernoulli: along a streamline, ½ρV² + P is approximately constant (ignoring losses). As V drops in the diverging passage, P rises. The diffuser shape is just a way to trade velocity head for pressure head.",
      },
      {
        id: "s5-p2",
        type: "mcq",
        kind: "analysis",
        stem: "A vaned diffuser is replaced with a vaneless one of the same length and exit area. Holding everything else fixed, which best describes the change?",
        options: [
          "Higher Cp at design, wider stable range",
          "Lower Cp at design, wider stable range",
          "Lower Cp at design, narrower stable range",
          "Higher Cp at design, narrower stable range",
        ],
        correct: 1,
        explain: "Vanes can turn flow more aggressively → higher Cp, but they have a narrow angle-of-attack window. Removing the vanes lowers Cp but widens the stable operating range. Small turbojets routinely accept the Cp hit for operability.",
      },
      {
        id: "s5-p3",
        type: "mcq",
        kind: "application",
        stem: "Impeller exit velocity is 400 m/s; air density there ρ = 1.6 kg/m³; the diffuser achieves Cp = 0.7. The static pressure rise across the diffuser is approximately:",
        options: [
          "32 kPa",
          "90 kPa",
          "180 kPa",
          "360 kPa",
        ],
        correct: 1,
        explain: "ΔP = Cp · ½ρV² = 0.7 · 0.5 · 1.6 · 400² = 0.7 · 128000 = 89.6 kPa ≈ 90 kPa.",
      },
    ],
  },

  // ─── 6 ────────────────────────────────────────────────────────────────
  {
    id: "s6",
    number: 6,
    title: "Compressor mapping & stability",
    subtitle: "Reading the operating envelope.",
    outcomes: [
      { verb: "Interpret", text: "Interpret a compressor map: identify the surge line, choke line, speed lines, and operating line." },
      { verb: "Calculate", text: "Calculate corrected mass flow ṁ·√θ/δ and corrected speed N/√θ from raw measurements." },
      { verb: "Evaluate", text: "Evaluate a proposed operating point against required surge margin (≥10% at design)." },
    ],
    cards: [
      {
        id: "s6-c1",
        heading: "What the map plots",
        body: "A compressor map shows the relationship between mass flow, pressure ratio, and speed.",
        bullets: [
          "X-axis: corrected mass flow ṁ_corr = ṁ·√θ / δ (kg/s)",
          "Y-axis: stage stagnation pressure ratio PR = P03 / P02",
          "Family of curves: each line is one fixed corrected RPM (N_corr = N/√θ)",
          "θ = T01/T_ref, δ = P01/P_ref normalise to ISA sea level (T_ref = 288.15 K, P_ref = 101.325 kPa).",
          "Correcting for θ and δ collapses every ambient day onto a single chart — you can compare a hot-day test to a cold-day test cleanly.",
        ],
      },
      {
        id: "s6-c2",
        heading: "Surge line — the leftmost stable boundary",
        body: "The surge line connects the leftmost stable point of every speed line. To the LEFT of the surge line the PR-vs-flow slope goes positive, flow oscillates, then briefly reverses → catastrophic. Audible bang, EGT spike, rotor damage in seconds. Operating point must NEVER cross to the left of the surge line.",
      },
      {
        id: "s6-c3",
        heading: "Choke line — the rightmost flow boundary",
        body: "The choke line is the right-hand boundary where flow reaches sonic speed (M = 1) in some throat. Operating choked is OK but it means you've hit the flow ceiling — the compressor cannot pass any more air no matter what upstream pressure does. Most small turbojets at full power sit just left of the choke line.",
      },
      {
        id: "s6-c4",
        heading: "Operating line and surge margin",
        body: "The operating line is the steady-state path the engine traces through the map as throttle changes. Drawn from the cycle deck. Should sit between surge and choke at all power settings.",
        bullets: [
          "Required surge margin: ≥ 10% at design point (industry standard for small turbojets).",
          "More margin needed for distortion and transients — typical design target 15–20%.",
          "Document SM at all key conditions in the design record.",
        ],
      },
    ],
    probes: [
      {
        id: "s6-p1",
        type: "mcq",
        kind: "concept",
        stem: "On a compressor map, the speed lines are typically plotted in terms of:",
        options: [
          "Raw RPM, in thousands",
          "Corrected RPM N/√θ, where θ = T01/T_ref",
          "Mass flow times pressure ratio",
          "Mach number at the impeller eye",
        ],
        correct: 1,
        explain: "Corrected RPM normalises out inlet temperature so a single map covers all ambient conditions. Without correction, every test day would yield a different-looking chart.",
      },
      {
        id: "s6-p2",
        type: "mcq",
        kind: "application",
        stem: "An engine is running with a pressure ratio of 3.0 at corrected flow of 0.85 kg/s. The surge-line pressure ratio at the same corrected flow is 3.3. The surge margin is approximately:",
        options: [
          "+10%",
          "−10%",
          "+30%",
          "+3%",
        ],
        correct: 0,
        explain: "Surge margin ≈ (PR_surge − PR_op) / PR_op = (3.3 − 3.0)/3.0 = 10%. Right at the industry-standard minimum for design point. Any distortion would push into surge — needs more margin for a real design.",
      },
      {
        id: "s6-p3",
        type: "mcq",
        kind: "analysis",
        stem: "An operating point moves RIGHTWARD on the compressor map at fixed corrected RPM. What does this mean physically?",
        options: [
          "Mass flow is increasing while PR drops — the engine is approaching choke",
          "Mass flow is decreasing while PR rises — the engine is approaching surge",
          "Mass flow and PR both rise — the engine is accelerating",
          "Mass flow and PR both drop — the engine is decelerating",
        ],
        correct: 0,
        explain: "Rightward = higher mass flow at fixed RPM. Along a speed line the PR-vs-flow slope is negative, so PR drops as flow rises. That's the choke side of the map.",
      },
    ],
  },

  // ─── 7 ────────────────────────────────────────────────────────────────
  {
    id: "s7",
    number: 7,
    title: "Stall and surge mechanisms",
    subtitle: "Why bad throttle handling kills engines.",
    outcomes: [
      { verb: "Distinguish", text: "Distinguish rotating stall from surge by frequency, mass-flow signature, and engine outcome." },
      { verb: "Explain", text: "Explain the propagation mechanism of rotating-stall cells and the global instability mechanism of surge." },
      { verb: "Select", text: "Select an appropriate mitigation (operating-line shift, bleed, casing treatment, slow throttle schedule) for a given instability." },
    ],
    cards: [
      {
        id: "s7-c1",
        heading: "Rotating stall vs surge — two distinct instabilities",
        body: "Rotating stall is a localised stall cell that occupies a few impeller passages and travels round the wheel at 20–80% of rotor speed. The engine keeps running but loses PR and efficiency in that sector. Mechanism: incidence on a few blades exceeds critical; those passages choke; the blockage off-loads neighbours and over-loads the next blades in the direction of rotation, so the cell propagates.",
        bullets: [
          "Symptoms — periodic pressure pulsation at sub-synchronous frequency, audible whine, blade HCF risk, mild thrust dip.",
        ],
      },
      {
        id: "s7-c2",
        heading: "Surge — the global flow reversal",
        body: "Surge is a violent global flow reversal of the whole stage. Mass flow oscillates and can briefly reverse. Triggered when pressure behind the compressor exceeds what the impeller can maintain (often from aggressive throttle moves). Audible 'bang', EGT spike, possible flame-out. FADEC should auto-cut on detection; manual abort is the engineer's responsibility if FADEC misses it.",
      },
      {
        id: "s7-c3",
        heading: "Why both matter — different cures",
        body: "Rotating stall usually appears first as you walk up to surge — but treating it as 'early-warning surge' is wrong because the cures differ.",
        bullets: [
          "Rotating stall responds to casing treatment (slots, grooves) and inducer recirculation.",
          "Surge needs operating-line shift (more SM), bleed valves, or variable geometry.",
          "Diffuser-driven rotating stall is the more common inception path here.",
        ],
      },
      {
        id: "s7-c4",
        heading: "Sustain speed",
        body: "Sustain speed = minimum RPM at which the rotor can accelerate under its own power. Below this, bearing friction + internal losses exceed the work the impeller can extract from the fuel. Engine flames out or hangs at sub-idle.",
        bullets: [
          "For the 700 N reference engine: sustain speed ≈ 25–30% of design RPM (i.e. ≈ 20–24 k rpm).",
        ],
      },
      {
        id: "s7-c5",
        heading: "Anti-surge engineering",
        body: "Standard mitigations:",
        bullets: [
          "Backswept impeller blades (β2 < 90°) — naturally widen the surge margin.",
          "Bleed valve on combustor inlet — opens during transients to dump excess pressure.",
          "Slow throttle schedule in the ECU/FADEC — prevents transient surge excursion.",
          "Casing treatment (axial slots over impeller tips) — recovers surge margin at the cost of some design-point efficiency.",
        ],
      },
    ],
    probes: [
      {
        id: "s7-p1",
        type: "mcq",
        kind: "concept",
        stem: "The KEY distinguishing feature of surge versus rotating stall is:",
        options: [
          "Surge has a higher frequency than rotating stall",
          "Surge is a global flow-reversal instability of the whole stage; rotating stall is a localised cell that propagates around the wheel",
          "Rotating stall causes flame-out; surge does not",
          "Surge happens only at low RPM; rotating stall only at high RPM",
        ],
        correct: 1,
        explain: "Surge = whole-stage global instability; mass flow can briefly reverse. Rotating stall = localised cell occupying a few passages, propagating around the wheel at sub-synchronous speed. Both can be present; they need different cures.",
      },
      {
        id: "s7-p2",
        type: "mcq",
        kind: "application",
        stem: "On a test stand, you see a periodic 1 kHz pressure pulsation in the diffuser, a faint whine, but mass flow and PR stay roughly steady. What are you most likely looking at?",
        options: [
          "Surge",
          "Rotating stall",
          "Choke",
          "Bearing failure",
        ],
        correct: 1,
        explain: "Sub-synchronous periodic pulsation with steady mean flow = rotating stall. Surge would show large oscillation/reversal of mean flow plus a loud bang and EGT spike.",
      },
      {
        id: "s7-p3",
        type: "mcq",
        kind: "evaluation",
        stem: "Your engine surges on rapid throttle-up. Which mitigation BEST addresses the cause rather than the symptom?",
        options: [
          "Adding a vibration sensor to detect surge faster",
          "Slowing the FADEC throttle schedule and/or opening a transient bleed valve",
          "Re-grinding the bearings to lower friction",
          "Adding casing treatment slots",
        ],
        correct: 1,
        explain: "Rapid throttle moves push the operating point left across the surge line during the transient. The cure is to control how fast fuel flow ramps (FADEC schedule) and dump excess transient pressure with a bleed. Casing treatment helps rotating stall more than surge. Vibration sensors detect, they don't prevent.",
      },
    ],
  },

  // ─── 8 ────────────────────────────────────────────────────────────────
  {
    id: "s8",
    number: 8,
    title: "Governing equations and engineering relationships",
    subtitle: "The math that validates the design.",
    outcomes: [
      { verb: "Apply", text: "Apply the Euler turbomachinery equation w = U2·Cu2 − U1·Cu1 to compute specific work." },
      { verb: "Apply", text: "Apply the Wiesner slip-factor correlation σ = 1 − √(sin β2′)/z^0.7 with the correct angle convention." },
      { verb: "Calculate", text: "Calculate shaft power required from ṁ and specific work, then sanity-check tip Mach and PR against design intent." },
    ],
    cards: [
      {
        id: "s8-c1",
        heading: "Euler turbomachinery equation",
        body: "Specific work transferred per unit mass:",
        bullets: [
          "w = U2·Cu2 − U1·Cu1   [J/kg]",
          "With axial inlet (no pre-swirl), Cu1 = 0 → w = U2·Cu2.",
          "Total shaft power: P = ṁ·w   [W]",
          "Including slip: Cu2 = σ·U2  → w = σ·U2² (radial blades), or in general σ·U2·(U2 + Wu2_blade).",
        ],
      },
      {
        id: "s8-c2",
        heading: "Slip factor — Wiesner correlation",
        body: "Real rotors don't deliver the geometric Cu2 because air doesn't follow the blade angle perfectly (inertia + pressure gradients).",
        bullets: [
          "Wiesner: σ = 1 − √(sin β2′) / z^0.7",
          "β2′ is measured from the radial direction (radial blade → β2′ = 0°, backswept → β2′ ≈ 25–30°).",
          "Convention reminder — β2′ is NOT the same as the β2 on the backswept-vs-radial slide. Convert: β2′ = 90° − β2.",
          "z = number of full blades.",
          "Typical σ = 0.85–0.92 for backswept impellers with 13–17 blades.",
        ],
      },
      {
        id: "s8-c3",
        heading: "Sanity-check the reference engine",
        body: "Plugging the 700 N reference engine numbers:",
        bullets: [
          "U2 = π·D2·N/60 = π·0.080·(80 000/60) ≈ 335 m/s",
          "Tip Mach (T01 ≈ 288 K → a ≈ 340 m/s): M2 = U2/a ≈ 0.99. High subsonic, edge of shock-loss regime.",
          "Specific work target: w ≈ 80 kJ/kg. Cu2,real = w/U2 ≈ 239 m/s.",
          "Slip σ ≈ 0.87 (Wiesner, β2′ ≈ 25°, z = 15) → Cu2,ideal = Cu2,real/σ ≈ 275 m/s. Margin to U2 (= 335) confirms backswept design intent.",
          "Power P = ṁ·w = 0.85·80 ≈ 68 kW. The turbine must return this plus mechanical/parasitic losses.",
        ],
      },
    ],
    probes: [
      {
        id: "s8-p1",
        type: "mcq",
        kind: "application",
        stem: "Compute U2 for a 54 mm impeller at 160 000 rpm.",
        options: [
          "≈ 110 m/s",
          "≈ 286 m/s",
          "≈ 452 m/s",
          "≈ 905 m/s",
        ],
        correct: 2,
        explain: "U2 = π · 0.054 · (160 000/60) = π · 0.054 · 2666.67 ≈ 452 m/s. At ISA temperature that's about Mach 1.33 at the tip — well into the supersonic-tip 'scream' regime characteristic of high-performance small turbojets.",
      },
      {
        id: "s8-p2",
        type: "mcq",
        kind: "application",
        stem: "An impeller has 15 full blades and a radial-direction exit angle β2′ = 25°. Using Wiesner, the slip factor σ is approximately:",
        options: [
          "≈ 0.55",
          "≈ 0.72",
          "≈ 0.87",
          "≈ 0.98",
        ],
        correct: 2,
        explain: "σ = 1 − √(sin 25°)/15^0.7 = 1 − √(0.4226)/6.61 ≈ 1 − 0.650/6.61 ≈ 1 − 0.098 ≈ 0.90. Closest answer is 0.87 — within the typical 0.85–0.92 range for backswept impellers.",
      },
      {
        id: "s8-p3",
        type: "mcq",
        kind: "analysis",
        stem: "Specific work on the reference engine is ≈ 80 kJ/kg, mass flow is 0.85 kg/s. The shaft power the turbine must return to keep this compressor running is approximately:",
        options: [
          "≈ 9 kW",
          "≈ 68 kW",
          "≈ 240 kW",
          "≈ 800 kW",
        ],
        correct: 1,
        explain: "P = ṁ·w = 0.85 kg/s · 80 kJ/kg = 68 kW. The turbine must produce this plus mechanical/parasitic losses (bearings, oil pump, windage). Any shortfall means the spool can't sustain RPM.",
      },
    ],
  },

  // ─── 9 ────────────────────────────────────────────────────────────────
  {
    id: "s9",
    number: 9,
    title: "Design and analysis workflow",
    subtitle: "Practical sequence for small-scale builds.",
    outcomes: [
      { verb: "Outline", text: "Outline the design sequence: wheel selection → housing matching → diffuser alignment → stability analysis → map verification." },
      { verb: "Justify", text: "Justify sourcing impellers from the automotive turbocharger industry for small-engine builds." },
      { verb: "Calculate", text: "Calculate sustain speed from cycle-deck output and identify the minimum stable RPM." },
    ],
    cards: [
      {
        id: "s9-c1",
        heading: "Wheel selection",
        body: "Source dynamically balanced wheels from the automotive industry — KKK or Garrett turbocharger wheels. Typical small-engine sizes are 66 mm or 84 mm impeller diameter. Pre-balanced from the factory saves dynamic-balancing cost and time. Trade-off: optimisation is fixed by the donor part. Custom CNC-milled aluminium impellers are reserved for higher-performance designs.",
      },
      {
        id: "s9-c2",
        heading: "Housing matching",
        body: "Set the critical tip gap by machining or selecting the housing inner diameter. Target 0.3–0.5 mm cold. Verify with a feeler gauge during assembly. Account for differential thermal expansion — the rotor heats faster than the housing on start-up, so the running gap is smaller than cold.",
      },
      {
        id: "s9-c3",
        heading: "Diffuser alignment",
        body: "Position the radial and axial guide vanes to minimise frontal area while ensuring a smooth 90° transition from radial impeller exit to axial combustor entry. Vane count typically 13–21 in the radial ring. Mounting tolerance ±0.1 mm for vane angular position.",
      },
      {
        id: "s9-c4",
        heading: "Stability analysis (sustain speed)",
        body: "Sustain speed is the minimum RPM below which the engine cannot accelerate.",
        bullets: [
          "Driven by bearing friction + windage vs available shaft work at that RPM.",
          "Calculate from cycle deck: at each RPM, P_turbine vs P_compressor + losses.",
          "Sustain speed is where they cross — RPM below this is unstable.",
        ],
      },
      {
        id: "s9-c5",
        heading: "Test-stand map verification",
        body: "Use a bench stand to map the surge limit and verify the operating line relative to the surge and choke limits. Sweep speed lines from idle to design RPM, recording PR vs ṁ at each. Identify surge point at each speed line and connect them to plot the surge line. Compare to the design map — investigate any discrepancy greater than ~5%.",
      },
    ],
    probes: [
      {
        id: "s9-p1",
        type: "mcq",
        kind: "concept",
        stem: "Why are radial compressors sourced from the automotive industry preferred over custom-built axial stages for model engines?",
        options: [
          "Custom-built axial stages have lower efficiency than turbocharger wheels",
          "Turbocharger wheels come dynamically balanced from production, are robust, and a single radial stage delivers adequate PR",
          "Axial compressors cannot reach the RPM range of small turbojets",
          "Aluminium turbocharger wheels are cheaper than steel axial stages",
        ],
        correct: 1,
        explain: "Pre-balanced from turbocharger production, robust, single-stage PR adequate. Custom axial would require multi-stage manufacturing complexity for the same PR, plus its own balancing program.",
      },
      {
        id: "s9-p2",
        type: "mcq",
        kind: "application",
        stem: "You are mapping a new build on a bench stand. You step through speed lines from 30% to 100% RPM and observe a 12% discrepancy in PR vs your design map. What is the FIRST thing to check?",
        options: [
          "Re-grind the bearings",
          "Verify tip-clearance gap, instrumentation accuracy (pressure taps, mass-flow meter), and reconcile inlet conditions to the corrected-flow basis",
          "Increase the diffuser vane count",
          "Replace the impeller with a larger one",
        ],
        correct: 1,
        explain: "Before mechanical changes, validate the measurement: is the gap what you think it is, are the pressure taps clean, is θ/δ correction applied properly? Most large discrepancies trace to measurement or assembly errors, not aerodynamic redesign.",
      },
    ],
  },

  // ─── 10 ───────────────────────────────────────────────────────────────
  {
    id: "s10",
    number: 10,
    title: "Worked example — 66 mm impeller (KJ-66 class)",
    subtitle: "From geometry to PR — the live calculation.",
    outcomes: [
      { verb: "Calculate", text: "Calculate U2 and tip Mach for the KJ-66 (D = 66 mm at 115 000 rpm)." },
      { verb: "Estimate", text: "Estimate the expected pressure ratio band for the KJ-66 configuration." },
      { verb: "Evaluate", text: "Evaluate gap-clearance sensitivity and predict the outcome of a 1.2 mm running gap." },
    ],
    cards: [
      {
        id: "s10-c1",
        heading: "KJ-66 reference geometry",
        body: "The KJ-66 is a well-known 66 mm impeller small turbojet. It is the canonical educational example for this class.",
        bullets: [
          "Impeller diameter D = 0.066 m (66 mm)",
          "Operating shaft speed N = 115 000 rpm",
          "Expected PR ≈ 2.0–2.5 (KJ-66 measured ≈ 2.2)",
        ],
      },
      {
        id: "s10-c2",
        heading: "Step 1 — tip speed and Mach",
        body: "U2 = π · 0.066 · 115 000 / 60 ≈ 397 m/s. At ISA sea level, a ≈ 340 m/s → M2 = 397/340 ≈ 1.17. This supersonic tip speed explains the high energy levels and the characteristic 'scream' of small turbojets in this class.",
      },
      {
        id: "s10-c3",
        heading: "Step 2 — pressure ratio band",
        body: "At U2 ≈ 397 m/s the typical PR for a backswept small-turbojet impeller is 2.0–2.5, with measured KJ-66 around 2.2. Compare this to the 700 N reference engine's PR = 3.5 at U2 = 335 m/s — the reference engine has a larger D2 (80 mm) and a more aggressive aerodynamic design.",
      },
      {
        id: "s10-c4",
        heading: "Step 3 — gap sensitivity",
        body: "Held to a 0.4 mm running gap, efficiency stays high and the engine makes its rated PR. If manufacturing yields a 1.2 mm gap (3× the target), so much air recirculates over the tip that the pressure potential collapses — the engine cannot sustain its own rotation. Lesson: gap measurement is the single most important pre-test check for this engine class.",
      },
    ],
    probes: [
      {
        id: "s10-p1",
        type: "mcq",
        kind: "application",
        stem: "For the KJ-66 (D = 66 mm, N = 115 000 rpm), what is U2?",
        options: [
          "≈ 79 m/s",
          "≈ 198 m/s",
          "≈ 397 m/s",
          "≈ 633 m/s",
        ],
        correct: 2,
        explain: "U = π·D·N/60 = π · 0.066 · (115 000/60) ≈ π · 0.066 · 1916.67 ≈ 397 m/s.",
      },
      {
        id: "s10-p2",
        type: "mcq",
        kind: "evaluation",
        stem: "A KJ-66 build is measured with a 1.2 mm tip clearance gap. What is the expected first-run outcome?",
        options: [
          "Slight efficiency loss; engine reaches design PR",
          "Engine reaches about 60% of design PR but runs",
          "Engine cannot sustain its own rotation",
          "Engine surges on first throttle-up",
        ],
        correct: 2,
        explain: "1.2 mm is well past the ~1.0 mm cliff. The fraction of work going into useful pressure rise drops below what's needed to overcome bearing friction + windage. Engine hangs at sub-sustain speed.",
      },
    ],
  },

  // ─── 11 ───────────────────────────────────────────────────────────────
  {
    id: "s11",
    number: 11,
    title: "Common mistakes and misconceptions",
    subtitle: "Three myths that kill small engines.",
    outcomes: [
      { verb: "Discriminate", text: "Discriminate myth from reality on tip-clearance, slip-factor, and surge-mitigation choices." },
      { verb: "Justify", text: "Justify the 0.3–0.5 mm cold-clearance window on thermal-expansion grounds, not just efficiency." },
    ],
    cards: [
      {
        id: "s11-c1",
        heading: "Myth — smaller gaps are always better",
        body: "Reality: rotor blades reach gas temperature almost instantly while the housing takes time to warm up. A gap smaller than 0.3 mm cold risks rotor jamming on first start due to differential thermal expansion. Result: rotor rub → bearing damage → shaft bow. The 0.3–0.5 mm window balances efficiency against thermal robustness — it is NOT just an efficiency compromise.",
      },
      {
        id: "s11-c2",
        heading: "Myth — slip is a manufacturing defect",
        body: "Reality: slip is a fluid-mechanical inevitability driven by inertia and pressure gradients across the blade. Even a perfectly manufactured impeller exhibits slip σ < 1. Wiesner's correlation lets you predict σ before cutting metal, so you can compensate by adjusting β2 or blade count.",
      },
      {
        id: "s11-c3",
        heading: "Myth — adding casing slots always helps",
        body: "Reality: casing treatment (slots, grooves) trades design-point efficiency for surge-margin recovery. It is the right call when rotating stall is the limiting failure mode. For surge driven by aggressive throttle handling, the cure is in the ECU acceleration schedule, not the casing.",
      },
      {
        id: "s11-c4",
        heading: "Connection forward — GT-06",
        body: "The high-pressure, high-velocity air leaving the diffuser has the peak fluid energy in the engine — but this energy is useless without controlled heat addition. GT-06 picks up here, analysing how the evaporative tube combustor stabilises a flame and achieves complete combustion within the ~1/500 second the air spends inside the chamber.",
      },
    ],
    probes: [
      {
        id: "s11-p1",
        type: "mcq",
        kind: "error",
        stem: "A student claims: 'We should target a 0.1 mm cold tip clearance because smaller gaps always give higher efficiency.' What is the BEST correction?",
        options: [
          "The claim is correct; aim for 0.1 mm",
          "0.1 mm cold is unsafe — differential thermal expansion on start-up will close the gap and cause rotor rub. Target 0.3–0.5 mm cold.",
          "The claim is wrong; bigger gaps give better efficiency",
          "Clearance does not affect efficiency",
        ],
        correct: 1,
        explain: "Efficiency-wise, smaller is better in steady state. But the thermal start-up transient eats the margin. The 0.3–0.5 mm window is the balance point — efficiency holds up AND the rotor doesn't rub on the housing during warm-up.",
      },
      {
        id: "s11-p2",
        type: "mcq",
        kind: "error",
        stem: "An engineer responds to a rotating-stall problem by tightening the throttle schedule in the FADEC. Why is this the WRONG mitigation?",
        options: [
          "Throttle schedule has no effect on either rotating stall or surge",
          "The FADEC change addresses surge transients but rotating stall needs casing treatment / inducer recirculation; choosing the wrong cure leaves the failure mode in place",
          "Rotating stall is harmless — no mitigation is needed",
          "The throttle schedule will trigger surge instead",
        ],
        correct: 1,
        explain: "Rotating stall and surge need different cures. Rotating stall is a localised propagating cell — fix it with casing treatment or recirculation. Surge is a global transient — fix it with operating-line shift, bleed, or slower throttle schedule. Mixing these up wastes a build cycle.",
      },
    ],
  },
];

// Summative quiz — drawn from the knowledge-check pool in the PDF, plus
// transfer items that use novel material (not seen in instruction).
export const SUMMATIVE = [
  {
    id: "q1",
    kind: "concept",
    stem: "Which station number marks the compressor exit / combustor inlet in the gas-path numbering used in this course?",
    options: ["Station 1", "Station 2", "Station 3", "Station 4"],
    correct: 2,
    explain: "Station 3 is the compressor exit = combustor inlet. Station 2 is the compressor inlet (impeller eye). Station 4 is the turbine NGV inlet.",
  },
  {
    id: "q2",
    kind: "application",
    stem: "An impeller of diameter D = 70 mm runs at 100 000 rpm. The tip speed U2 is approximately:",
    options: ["≈ 117 m/s", "≈ 367 m/s", "≈ 500 m/s", "≈ 920 m/s"],
    correct: 1,
    explain: "U = π · 0.070 · (100 000/60) = π · 0.070 · 1666.67 ≈ 366.5 m/s ≈ 367 m/s.",
  },
  {
    id: "q3",
    kind: "analysis",
    stem: "Two impellers are identical except for blade count: one has 9 blades, the other 17. Using the Wiesner correlation, which has the HIGHER slip factor σ?",
    options: ["9 blades (fewer = higher σ)", "17 blades (more = higher σ)", "Slip factor doesn't depend on blade count", "Both are identical because diameter is fixed"],
    correct: 1,
    explain: "Wiesner: σ = 1 − √(sin β2′)/z^0.7. Larger z → smaller second term → higher σ. More blades guide the flow better, reducing slip. The reason designers don't just keep adding blades is the resulting flow-passage blockage and viscous loss.",
  },
  {
    id: "q4",
    kind: "evaluation",
    stem: "An engine measured on the bench has a surge margin of 6% at the design point. The industry standard for small turbojets is ≥10%. The MOST defensible response is:",
    options: [
      "Ship it — 6% is close enough",
      "Redesign or rebalance the operating line: more backsweep, lower target PR, or open the diffuser; verify SM is back to ≥10% before flight clearance",
      "Increase the throttle schedule speed to push past the surge transient",
      "Add a vibration sensor and proceed to flight test",
    ],
    correct: 1,
    explain: "Below-spec SM means the engine has no headroom for transients or inlet distortion. The fix is aerodynamic — adjust backsweep, PR target, or diffuser to push the surge line left. Sensors don't move the surge line.",
  },
  {
    id: "q5",
    kind: "application",
    stem: "An impeller is producing tip Mach M2 = 1.05. Which is the MOST likely consequence?",
    options: [
      "Higher PR and higher efficiency than a Mach 0.9 design",
      "Higher work per kg but reduced efficiency due to shock losses at the tip",
      "Surge occurs unconditionally",
      "Slip factor falls to zero",
    ],
    correct: 1,
    explain: "Tip Mach > 1 introduces shock losses → lower stage efficiency. Work per kg rises with U2, but the η penalty bites. Designers either accept the trade for raw PR or use backsweep to drop the relative Mach back below 1.",
  },
  {
    id: "q6",
    kind: "analysis",
    stem: "White smoke from the exhaust at high RPM is observed. Is this a compressor or combustor failure?",
    options: [
      "Compressor — gap too large, mass flow falling",
      "Combustor — incomplete combustion / fuel passing unburned",
      "Surge — rotor reversed flow",
      "Bearing failure — oil burning",
    ],
    correct: 1,
    explain: "White smoke = unburned/partially-burned fuel = combustor problem (poor atomisation, low air, flame quench). Compressor failure would show low thrust + low PR + EGT changes, not white smoke. Oil burning shows blue smoke.",
  },
  {
    id: "q7",
    kind: "application",
    stem: "For a 70 mm wheel at 90 000 rpm running radial blades (β2 = 90°, σ ≈ 0.85), with axial inlet, the specific work the impeller delivers is approximately:",
    options: ["≈ 27 kJ/kg", "≈ 53 kJ/kg", "≈ 92 kJ/kg", "≈ 180 kJ/kg"],
    correct: 2,
    explain: "U2 = π · 0.070 · (90000/60) ≈ 330 m/s. w = σ · U2² = 0.85 · 330² = 0.85 · 108 900 ≈ 92 550 J/kg ≈ 92 kJ/kg.",
  },
  {
    id: "q8",
    kind: "concept",
    stem: "On a compressor map, the 'choke line' represents:",
    options: [
      "The minimum RPM at which the engine can self-sustain",
      "The boundary where flow reaches sonic speed (M=1) in some throat, capping mass-flow capacity",
      "The leftmost stable boundary of every speed line",
      "The steady-state operating line at full throttle",
    ],
    correct: 1,
    explain: "Choke line = flow ceiling, where some passage hits M = 1. Beyond this the compressor can't pass more air regardless of upstream pressure. The leftmost stable boundary is the surge line. Sustain speed is the minimum self-acceleration RPM, not a map boundary.",
  },
  {
    id: "q9",
    kind: "evaluation",
    stem: "An engine specification sheet lists tip clearance as 0.9 mm. Compared to the design rules in this session, this is:",
    options: [
      "Below the lower limit (0.3 mm) and unsafe",
      "Inside the 0.3–0.5 mm window",
      "Above 0.5 mm — efficiency penalty is significant, approaching the 1.0 mm cliff",
      "Above 1.5 mm — engine cannot run",
    ],
    correct: 2,
    explain: "0.9 mm is well above the 0.5 mm upper end of the sweet-spot window and close to the 1.0 mm cliff. Each 0.1 mm above target costs ~1% η, so 0.9 mm vs 0.4 mm is about a 5-percentage-point efficiency loss — significant but the engine still runs.",
  },
  {
    id: "q10",
    kind: "analysis",
    stem: "The Turbomeca Marbore-style 'two-ring' diffuser arrangement is most beneficial when:",
    options: [
      "Mass flow is very high and a single ring cannot handle it",
      "A compact frontal area is required (e.g. flight installation) while still recovering most of the impeller exit KE",
      "Variable geometry is required",
      "The engine is unconditionally choked",
    ],
    correct: 1,
    explain: "The two-ring (radial then axial) arrangement turns the flow 90° while diffusing it, so the engine stays slim — lower frontal area, lower drag in flight. Same Cp as a single long radial diffuser but in a much shorter package.",
  },
  {
    id: "q11",
    kind: "evaluation",
    stem: "You see a pressure trace from the diffuser showing 40% PR oscillation at a frequency comparable to the rotor speed, and the engine continues to run but the EGT is creeping up. The MOST likely diagnosis is:",
    options: [
      "Choke — increase throttle",
      "Surge — auto-cut and inspect",
      "Bearing failure — emergency shutdown",
      "Normal operation",
    ],
    correct: 1,
    explain: "Large PR oscillation with rising EGT during steady throttle is the surge signature. Even if the engine 'continues to run', it's flirting with structural damage. Auto-cut, inspect blades + bearings, find the root cause (operating line crossed surge line) before next run.",
  },
  {
    id: "q12",
    kind: "application",
    stem: "An engineer increases blade count from 13 to 17 on a small-turbojet impeller, keeping everything else equal. Using Wiesner, σ rises from about 0.87 to 0.90. With U2 ≈ 335 m/s, the resulting change in specific work (radial blades, axial inlet) is:",
    options: [
      "Drops by ~3%",
      "Rises by ~3%",
      "Drops by ~30%",
      "No change because U2 didn't change",
    ],
    correct: 1,
    explain: "w = σ · U2². With σ going from 0.87 → 0.90, work scales by 0.90/0.87 ≈ 1.034 → about a 3% rise. The catch: 17 blades reduce passage area and can raise viscous loss, so real-world η may not improve as much as σ alone suggests.",
  },
];

// Concept-to-section index for spaced-repetition reporting.
export const CONCEPT_INDEX = SECTIONS.flatMap(s => [
  ...s.cards.map(c => ({ id: c.id, sectionId: s.id, label: c.heading })),
  { id: `section::${s.id}`, sectionId: s.id, label: `Section ${s.number}: ${s.title}` },
]);

export function findConcept(conceptId) {
  return CONCEPT_INDEX.find(c => c.id === conceptId) || { id: conceptId, label: conceptId };
}
