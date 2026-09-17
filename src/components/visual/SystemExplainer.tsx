import Image from "next/image";
import { Eyebrow, Section } from "@/components/ui/Section";

const components = [
  {
    id: "deck-helm", name: "Deck & helm", location: "Upper layer", x: 53, y: 18,
    title: "The fishing space above the engineering.",
    body: "The upper assembly brings the forward and aft casting decks, pedestal seats, storage hatches and central helm into one layout. The windscreen, wheel and display sit together at the console, leaving the fishing platforms at either end of the boat.",
    detail: "The exploded view lifts the deck away to reveal the equipment below. In the assembled boat, access is through the designated hatches and service openings.",
  },
  {
    id: "battery-modules", name: "Battery modules", location: "Below the deck", x: 31, y: 33,
    title: "Stored energy, integrated into the layout.",
    body: "The rectangular modules beneath the deck represent the battery system. The illustration separates them into two groups around the central electrical equipment, showing how energy storage shares the hull with the boat’s structure and service spaces.",
    detail: "The battery supplies electrical energy to the drive system. Capacity, charging equipment and the battery-management package are specified together for the selected market configuration.",
  },
  {
    id: "power-control", name: "Power electronics", location: "Between the battery groups", x: 48, y: 37,
    title: "Connecting the helm to the motor.",
    body: "The central enclosures and cable connections represent the power and control equipment. In an electric drive, the motor controller regulates the electrical power delivered to the motor in response to the driver’s demand.",
    detail: "The battery-management system monitors the battery, while the drive controller manages the motor. These are different jobs within the same propulsion system; the drawing shows their overall arrangement rather than a wiring diagram.",
  },
  {
    id: "hull-structure", name: "Hull structure", location: "Middle layer", x: 31, y: 51,
    title: "The framework that carries the system.",
    body: "With the deck raised, the hull’s longitudinal members and transverse frames become visible. They form the supporting framework around the equipment bays and provide mounting locations for the assemblies carried inside the boat.",
    detail: "The arrangement makes the relationship between fishing space, structural support and machinery easier to see. Final equipment mounting and service clearances belong to the detailed build specification.",
  },
  {
    id: "electric-motor", name: "Motor & coupling", location: "Lower layer · centre-left", x: 39, y: 67,
    title: "Electrical energy becomes rotation.",
    body: "The cylindrical motor and adjoining mechanical assembly sit below the hull in this view. The motor turns electrical energy into shaft rotation, which drives the waterjet pump through the connected drive assembly.",
    detail: "The motor provides the mechanical input; the pump transfers that energy to the water. Motor power, pump selection and battery capacity are matched as part of the propulsion package.",
  },
  {
    id: "water-intake", name: "Intake & water path", location: "Lower layer · left", x: 20, y: 74,
    title: "The waterjet begins beneath the hull.",
    body: "The screened opening and blue duct illustrate the intake side of the propulsion system. Water enters the intake and is guided into the pump, where the rotating impeller adds energy to the flow.",
    detail: "The intake is a separate part of the water path from the outlet at the stern. Its screen and access arrangement are included in routine inspection and maintenance planning.",
  },
  {
    id: "thermal-system", name: "Thermal management", location: "Lower layer · blue plumbing", x: 49, y: 83,
    title: "A dedicated path for moving heat.",
    body: "A heat-exchanger assembly and blue plumbing are shown alongside the drive components. Liquid cooling carries heat from the equipment to a heat exchanger so it can be transferred away from the system.",
    detail: "The smaller cooling lines serve a different purpose from the large propulsion-water duct. Cooling connections, circulation and temperature monitoring are defined for the final drive configuration.",
  },
  {
    id: "jet-steering", name: "Jet & reverse bucket", location: "Lower layer · right", x: 84, y: 80,
    title: "Water flow becomes thrust and control.",
    body: "At the right-hand end, the outlet and steering assembly direct the accelerated water leaving the pump. Expelling water astern produces forward thrust; changing the direction of the jet provides steering.",
    detail: "The bucket-shaped deflector shown at the end redirects the jet for reverse thrust. This is how a waterjet changes the boat’s direction of travel without using an exposed propeller at the transom.",
  },
];

export function SystemExplainer() {
  return (
    <Section id="system-explained" className="system-explainer pt-0">
      <div className="system-heading">
        <div><Eyebrow>Inside the system</Eyebrow><h2>One boat.<br />Every layer connected.</h2></div>
        <p>Explore the complete electric-jet architecture, from the casting deck to the propulsion system beneath it. Follow the numbered components to see what each part does and how it fits into the whole.</p>
      </div>

      <figure className="system-figure">
        <div className="system-image-wrap">
          <Image src="/media/swankey-electric-jet-exploded.jpg" width={1672} height={941} priority alt="Complete exploded electric boat illustration: fishing deck and helm above battery modules, power electronics and framed hull, with motor, screened intake, cooling assembly and waterjet below." />
          {components.map((part, index) => <a key={part.id} className="system-pin" style={{left: `${part.x}%`, top: `${part.y}%`}} href={`#${part.id}`} aria-label={`${index + 1}. ${part.name}: read explanation`}><span>{String(index + 1).padStart(2, "0")}</span></a>)}
        </div>
        <figcaption><span>Exploded system view · Select a number to explore.</span><a href="/media/swankey-electric-jet-exploded.jpg" target="_blank" rel="noopener noreferrer">View full image <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a></figcaption>
      </figure>
      <p className="system-note">Components are separated to show their relationship. The illustration explains the system layout; final components and specifications are confirmed in your build sheet.</p>

      <div className="system-flows" aria-label="How electric jet propulsion works">
        <div><p className="overline">01 / Energy path</p><h3>From battery to rotation.</h3><ol><li>Battery</li><li>Controller</li><li>Motor</li><li>Pump</li></ol><p>Stored electrical energy becomes the mechanical power that drives the waterjet.</p></div>
        <div><p className="overline">02 / Water path</p><h3>From water flow to movement.</h3><ol><li>Intake</li><li>Impeller</li><li>Nozzle</li><li>Thrust</li></ol><p>The pump accelerates water. The outlet and reverse deflector direct it to move and steer the boat.</p></div>
      </div>

      <div className="system-details">
        {components.map((part, index) => <article key={part.id} id={part.id} className="system-detail" tabIndex={-1} aria-labelledby={`${part.id}-title`}>
          <span className="system-detail-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
          <div><p className="system-location">{part.location}</p><h3 id={`${part.id}-title`}>{part.name}</h3><p className="system-detail-lead">{part.title}</p><p>{part.body}</p><p>{part.detail}</p><a href="#system-explained" className="system-back">Back to the full diagram <span aria-hidden="true">↑</span></a></div>
        </article>)}
      </div>
    </Section>
  );
}
