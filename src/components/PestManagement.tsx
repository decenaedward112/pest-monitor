interface PestManagementInfoProps {
  cropStage: string;
  type: string[];
}

export const getPestManagementInfo = ({
  cropStage,
  type,
}: PestManagementInfoProps) => {
  return (
    <div className="w-8/12">
      <div className="bg-[#dee8c9] p-10 rounded-3xl grid gap-8">
        <div>
          <h1 className="text-6xl font-semibold text-[#4e622a]">
            SIYASAT&apos;S
          </h1>
          <h2 className="text-2xl font-semibold">
            Suggested Pest Management Response
          </h2>
        </div>

        {/* Harvest Stage */}
        {cropStage === "Harvest" &&
          type.length === 1 &&
          type.includes("ysb") && (
            <div>
              <p>
                1. Use light traps to attract and capture adult yellow stem
                borers, helping to monitor their population and reduce their
                numbers.
              </p>
              <p>
                2. Immediately harvest when 85% of the grains are
                straw/yellow-colored to minimize the time that mature grains are
                exposed to pests, reducing infestations and damage.
              </p>
              <p>
                3. After harvest, flood the fields to control pest infestation
                by drowning pests and disrupting their life cycles, effectively
                reducing pest populations.
              </p>
              <p>
                4. Integrate crop rotation to reduce the incidence of pests
                targeting the crop.
              </p>
            </div>
          )}

        {cropStage === "Harvest" &&
          type.length === 1 &&
          type.includes("deadhearts") && (
            <div>
              <p>
                1. Keep the paddy clean by harvesting at ground level to prevent
                larvae from completing their life cycles in the stems.
              </p>
              <p>
                2. Thoroughly remove all crop residues after harvest, including
                stubble, leaves, and ears, as these can harbor pests.
              </p>
              <p>
                3. Collect and destroy any plants showing signs of pest damage
                to eliminate potential breeding grounds.
              </p>
            </div>
          )}

        {cropStage === "Harvest" &&
          type.length === 1 &&
          type.includes("eggs") && (
            <div>
              <p>
                1. Manually remove and destroy any egg masses found on the leaf
                blades to reduce the potential for hatching and subsequent
                infestations.
              </p>
            </div>
          )}

        {cropStage === "Harvest" &&
          type.length === 2 &&
          type.includes("deadhearts") &&
          type.includes("ysb") && (
            <div>
              <p>
                1. Remove all crop residues after harvest, including stubble,
                leaves, and ears, as they can serve as breeding grounds for
                pests.
              </p>
              <p>
                2. Collect and destroy any plants showing signs of pest damage.
              </p>
              <p>
                3. If it is the second crop generation, plant soybeans.
                Intercropping may also be implemented, which involves planting
                other crops alongside rice that deter Yellow Stem Borers.
              </p>
              <p>
                4. Apply fertilizers with balanced nutrients and make sure to
                apply them on a strict schedule. Crops are more resistant to
                pests and can withstand stress over time with these actions.
              </p>
              <p>
                5. In order to mitigate damages, if 85% of the grains are
                straw/yellow-colored, harvest them immediately.
              </p>
              <p>
                6. After harvesting, flood the field to disrupt the life cycle
                of the pest.
              </p>
              <p>
                7. Utilize trapping methods such as light traps and pheromone
                traps to monitor and reduce pest numbers.
              </p>
            </div>
          )}

        {cropStage === "Harvest" &&
          type.length === 2 &&
          type.includes("deadhearts") &&
          type.includes("eggs") && (
            <div>
              <p>
                1. Remove all crop residues after harvest, including stubble,
                leaves, and ears, as they can serve as breeding grounds for
                pests.
              </p>
              <p>
                2. Collect and destroy any plants showing signs of pest damage.
              </p>
              <p>
                3. If it is the second crop generation, plant soybeans.
                Intercropping may also be implemented, which involves planting
                other crops alongside rice that deter Yellow Stem Borers.
              </p>
              <p>
                4. Manually remove and crush the egg masses from the leaf
                blades. The ends of the leaf blades may be cut to avoid future
                egg laying on the blades.
              </p>
            </div>
          )}

        {cropStage === "Harvest" &&
          type.length === 2 &&
          type.includes("ysb") &&
          type.includes("eggs") && (
            <div>
              <p>
                1. In order to mitigate damages, if 85% of the grains are
                straw/yellow-colored, harvest them immediately.
              </p>
              <p>
                2. After harvesting, flood the field to disrupt the life cycle
                of the pest.
              </p>
              <p>
                3. Utilize trapping methods such as light traps and pheromone
                traps. Light traps attract Yellow Stem Borers and help monitor
                and reduce their numbers.
              </p>
              <p>
                4. Manually remove and crush the egg masses from the leaf
                blades. The ends of the leaf blades may be cut to avoid future
                egg laying on the blades.
              </p>
              <p>
                5. If it is the second crop generation, plant soybeans.
                Intercropping may also be implemented, which involves planting
                other crops alongside rice that deter Yellow Stem Borers.
              </p>
            </div>
          )}

        {cropStage === "Harvest" &&
          type.length === 3 &&
          type.includes("ysb") &&
          type.includes("deadhearts") &&
          type.includes("eggs") && (
            <div>
              <p>
                1. Remove all crop residues after harvest, including stubble,
                leaves, and ears, as they can serve as breeding grounds for
                pests.
              </p>
              <p>
                2. Collect and destroy any plants showing signs of pest damage.
              </p>
              <p>
                3. If it is the second crop generation, plant soybeans.
                Intercropping may also be implemented, which involves planting
                other crops alongside rice that deter Yellow Stem Borers.
              </p>
              <p>
                4. Manually remove and crush the egg masses from the leaf
                blades. The ends of the leaf blades may be cut to avoid future
                egg laying on the blades.
              </p>
              <p>
                5. In order to mitigate damages, if 85% of the grains are
                straw/yellow-colored, harvest them immediately.
              </p>
              <p>
                6. After harvesting, flood the field to disrupt the life cycle
                of the pest.
              </p>
              <p>
                7. Utilize trapping methods such as light traps and pheromone
                traps to monitor and reduce pest numbers.
              </p>
            </div>
          )}
        {/* Vegetative Stage */}
        {cropStage === "Vegetative" &&
          type.length === 1 &&
          type.includes("deadhearts") && (
            <div>
              <p>
                1. Remove and properly dispose stubbles and/or flood the field.
              </p>
              <p>2. Avoid close planting and continuous stagnant water.</p>
              <p>
                3. Do not use pesticides: Earlier studies reveal that yields
                were not significantly impacted even if DH incidence were up to
                31%. This is because crops in the vegetative stage compensate
                for the damage by producing more tillers.
              </p>
              <p>
                4. Pull out damaged shoots by hand: If it does not come out
                easily, it might be caused by other pests like the Rice Black
                Bug.
              </p>
            </div>
          )}

        {cropStage === "Vegetative" &&
          type.length === 1 &&
          type.includes("eggs") && (
            <div>
              <p>
                1. Handpick and destroy egg masses but keep some eggs in a jar
                to determine hatching and time for insecticide application.
              </p>
              <p>2. Clip the tip of the seedlings to reduce egg masses.</p>
              <p>
                3. Raise the water level of irrigation periodically to flood egg
                masses deposited in the lower parts of the crop.
              </p>
              <p>
                4. Avoid using pesticides: Eggs are protected by a shell made of
                YSB mat hair, so pesticides cause minimal damage.
              </p>
            </div>
          )}

        {cropStage === "Vegetative" &&
          type.length === 1 &&
          type.includes("ysb") && (
            <div>
              <p>
                1. Use systemic pesticides like Chlorantranilipore 12.5% SC at
                0.3 mL per liter of water (60 mL per acre).
              </p>
              <p>
                2. Try trapping methods like light traps and pheromone traps.
              </p>
              <p>
                3. Encourage biological control agents like parasitoids through
                egg parasitization.
              </p>
              <p>
                4. Use recommended pesticides: ETL recommends treating when
                there are 2 egg masses/m² or 10% dead heart, using insecticides
                such as Quinalphos 25 EC (100 mL/ha), Phosphamidon 40 SL (600
                mL/ha), or Profenophos 50 EC (1000 mL/ha). Newly hatched larvae
                require two applications spaced 7 days apart.
              </p>
            </div>
          )}

        {cropStage === "Vegetative" &&
          type.length === 2 &&
          type.includes("deadhearts") &&
          type.includes("ysb") && (
            <div>
              <p>1. Remove and properly dispose stubbles.</p>
              <p>2. Avoid close planting and continuous stagnant water.</p>
              <p>3. Affected tillers should be pulled out and destroyed.</p>
            </div>
          )}

        {cropStage === "Vegetative" &&
          type.length === 2 &&
          type.includes("deadhearts") &&
          type.includes("eggs") && (
            <div>
              <p>1. Scout the rice field for early detection.</p>
              <p>2. Clip the tip of the seedlings to reduce egg masses.</p>
              <p>
                3. Raise the water level of irrigation periodically to flood egg
                masses deposited in the lower parts of the crop.
              </p>
              <p>
                4. Avoid using pesticides. Studies reveal that yields were not
                significantly impacted even if DH incidence were up to 31%.
              </p>
            </div>
          )}

        {cropStage === "Vegetative" &&
          type.length === 2 &&
          type.includes("ysb") &&
          type.includes("eggs") && (
            <div>
              <p>
                1. Try trapping methods like light traps and pheromone traps.
              </p>
              <p>
                2. Encourage biological control agents like parasitoids through
                egg parasitization.
              </p>
              <p>
                3. Cut the leaf-top before transplanting to prevent carry-over
                eggs from seedbed to the field.
              </p>
            </div>
          )}

        {cropStage === "Vegetative" && type.length === 3 && (
          <div>
            <p>
              1. Utilize chemical treatments such as carbofuran and imidacloprid
              since these have been studied to be the most effective in
              significantly reducing the amount of pests.
            </p>
          </div>
        )}

        {/* Reproductive Stage */}
        {cropStage === "Reproductive" &&
          type.length === 1 &&
          type.includes("ysb") && (
            <div>
              <p>
                1. Ensure balanced and scheduled application of fertilizers to
                make crops more resistant to pests.
              </p>
              <p>
                2. Implement intercropping to confuse pests by planting other
                crops alongside rice that are not favorable to yellow stem
                borers or that deter the pest.
              </p>
            </div>
          )}

        {cropStage === "Reproductive" &&
          type.length === 1 &&
          type.includes("deadhearts") && (
            <div>
              <p>
                1. Immediate harvest or cut out affected plants immediately to
                prevent further losses and limit the spread of pests.
              </p>
              <p>
                2. Apply recommended pesticides if pest populations are high,
                following local guidelines and safety protocols shared by the
                government or experts.
              </p>
            </div>
          )}

        {cropStage === "Reproductive" &&
          type.length === 1 &&
          type.includes("eggs") && (
            <div>
              <p>
                1. Manually remove and destroy any observed egg masses from the
                leaf blades to reduce the potential for hatching and subsequent
                infestations.
              </p>
            </div>
          )}

        {cropStage === "Reproductive" &&
          type.length === 2 &&
          type.includes("deadhearts") &&
          type.includes("ysb") && (
            <div>
              <p>
                1. Destroy stubble before pupation by plowing into the field or
                flooding it.
              </p>
              <p>
                2. Pull out damaged shoots by hand: If it does not come out
                easily, it might be caused by other pests like the Rice Black
                Bug.
              </p>
              <p>
                3. Maximize the number of biological control agents such as
                parasitoids, predators, and microbial agents.
              </p>
              <p>
                4. Use insecticides targeting adult YSB since larvae and pupae
                stay in the stem.
              </p>
              <p>
                5. Utilize trap methods like light traps, bird perches, and sex
                pheromone traps.
              </p>
            </div>
          )}

        {cropStage === "Reproductive" &&
          type.length === 2 &&
          type.includes("deadhearts") &&
          type.includes("eggs") && (
            <div>
              <p>
                1. Destroy stubble before pupation by plowing into the field or
                flooding it.
              </p>
              <p>
                2. Pull out damaged shoots by hand manually: If it does not come
                out easily, it might be caused by other pests like the Rice
                Black Bug.
              </p>
              <p>
                3. Clip the tip of the leaf blade to reduce carry-over of eggs.
              </p>
              <p>
                4. Remove and destroy any observed egg masses to reduce the
                potential for hatching and subsequent infestations.
              </p>
            </div>
          )}

        {cropStage === "Reproductive" &&
          type.length === 2 &&
          type.includes("ysb") &&
          type.includes("eggs") && (
            <div>
              <p>
                1. Maximize biological control agents like parasitoids,
                predators, and microbial agents.
              </p>
              <p>
                2. Use insecticides targeting adult YSB since larvae and pupae
                stay in the stem, making adults the best targets.
              </p>
              <p>
                3. Utilize trap methods like light traps, bird perches, and sex
                pheromone traps.
              </p>
              <p>
                4. Clip the tip of the leaf blade to reduce carry-over of eggs.
              </p>
              <p>
                5. Remove and destroy any observed egg masses to reduce the
                potential for hatching and subsequent infestations.
              </p>
            </div>
          )}

        {cropStage === "Reproductive" && type.length === 3 && (
          <div>
            <p>
              1. Destroy stubble before pupation by plowing into the field or
              flooding it.
            </p>
            <p>
              2. Pull out damaged shoots by hand manually: If it does not come
              out easily, it might be caused by other pests like the Rice Black
              Bug.
            </p>
            <p>
              3. Maximize biological control agents like parasitoids, predators,
              and microbial agents.
            </p>
            <p>
              4. Use insecticides targeting adult YSB since larvae and pupae
              stay in the stem.
            </p>
            <p>
              5. Utilize trap methods like light traps, bird perches, and sex
              pheromone traps.
            </p>
            <p>
              6. Clip the tip of the leaf blade to reduce carry-over of eggs.
            </p>
            <p>
              7. Remove and destroy any observed egg masses to reduce the
              potential for hatching and subsequent infestations.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
