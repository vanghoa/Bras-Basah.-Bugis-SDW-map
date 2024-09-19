export default function DESIGN({ children }) {
  return (
    <>
      <p>
        This workshop is dedicated to harnessing systematic creativity with AI in the design of
        future autonomous vehicles. Its goal is to dismantle creative barriers, welcoming
        participants from all backgrounds to explore imaginative design concepts, regardless of
        their experience in automotive design. By utilising AI as a collaborative tool, attendees
        will engage in hands-on exercises that encourage them to overcome 'creative blocks' and
        generate innovative ideas. Participants will assume the role of design directors spotting
        new value proposition and design opportunities, guiding AI to explore their concepts. By the
        end of the workshop, they will have crafted an initial vision for a unique vehicle design
        and gained valuable insights on how to leverage AI to enhance creativity across various
        fields.
      </p>
      {children}
      <div className="credits">AI generation sponsored by Hypersketch and STUCK Design</div>
    </>
  );
}
