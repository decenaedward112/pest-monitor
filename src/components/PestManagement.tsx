import React from "react";

interface PestManagementInfoProps {
  cropStage: string;
  type: string;
}

export const getPestManagementInfo = ({
  cropStage,
  type,
}: PestManagementInfoProps) => {
  return (
    <div className="bg-[#dee8c9] p-10 rounded-3xl grid gap-8">
      <div>
        <h1 className="text-6xl font-semibold text-[#4e622a]">
          SIYASAT&apos;S
        </h1>
        <h2 className="text-2xl font-semibold">
          Suggested Pest Management Response
        </h2>
      </div>

      {cropStage === "Vegetative" && type === "deadhearts" && (
        <div>
          <p>1. Remove and properly dispose stubbles and/or flood the field.</p>
          <p>2. Avoid close planting and continuous stagnant water.</p>
          <p>
            3. Do not use pesticides: Earlier studies reveal that yields were
            not significantly impacted even if DH incidence were up to 31%. This
            is because crops in the vegetative stage compensate for the damage
            by producing more tillers.
          </p>
          <p>
            4. Pull out damaged shoots by hand: If it does not come out easily,
            it might be caused by other pests like the Rice Black Bug.
          </p>
        </div>
      )}

      {cropStage === "Vegetative" && type === "eggs" && (
        <div>
          <p>
            1. Handpick and destroy egg masses but keep some eggs in a jar in
            order to determine hatching and time for insecticide application.
          </p>
          <p>2. Clip the tip of the seedlings to reduce egg masses.</p>
          <p>
            3. Raise the water level of irrigation periodically in order to
            flood egg masses deposited in the lower parts of the crop.
          </p>
          <p>
            4. Avoid using pesticides: Given that eggs are protected with a
            protective shell made up of female YSB mat hair, pesticides and
            other chemicals only cause minimal damage.
          </p>
        </div>
      )}

      {cropStage === "Vegetative" && type === "ysb" && (
        <div>
          <p>
            1. Make use of systemic pesticides like Chlorantranilipore 12.5% SC
            at 0.3 mL per liter of water (60mL per acre).
          </p>
          <p>2. Try trapping methods like light traps and pheromone traps.</p>
          <p>
            3. Encourage growth in numbers of biological control agents like
            parasitoids through the use of egg parasitization.
          </p>
          <p>
            4. Use recommended pesticides: The Economic Threshold Level (ETL)
            for managing Yellow Stem Borer (YSB) involves treating crops when
            there are 2 egg masses/m² or 10% dead heart, using insecticides like
            Quinalphos 25 EC (100 mL/ha), Phosphamidon 40 SL (600 mL/ha), or
            Profenophos 50 EC (1000 mL/ha). Newly hatched larvae require two
            applications of either Quinalphos or Phosphamidon at 1000 mL/ha,
            spaced 7 days apart.
          </p>
        </div>
      )}

      {/* Harvest Stage */}
      {cropStage === "Harvest" && type === "ysb" && (
        <div>
          <p>
            1. Use light traps to attract and capture adult yellow stem borers.
          </p>
          <p>
            2. Immediately harvest when 85% of the grains are
            straw/yellow-colored.
          </p>
          <p>
            3. After harvest, flood the fields to control pest infestation by
            drowning pests.
          </p>
          <p>4. Integrate crop rotation to reduce pest targeting.</p>
        </div>
      )}

      {cropStage === "Harvest" && type === "deadhearts" && (
        <div>
          <p>
            1. Keep the paddy clean by harvesting at ground level and removing
            all crop residues after harvest.
          </p>
          <p>
            2. Thoroughly remove stubble, leaves, and ears as they can harbor
            pests.
          </p>
          <p>3. Collect and destroy any plants showing pest damage.</p>
        </div>
      )}

      {cropStage === "Harvest" && type === "eggs" && (
        <div>
          <p>
            1. Manually remove and destroy any egg masses on the leaf blades.
          </p>
        </div>
      )}

      {/* Reproductive Stage */}
      {cropStage === "Reproductive" && type === "ysb" && (
        <div>
          <p>
            1. Ensure balanced and scheduled application of fertilizers to make
            crops more resistant to pests.
          </p>
          <p>
            2. Implement intercropping by planting other crops alongside rice to
            confuse or deter the pest.
          </p>
        </div>
      )}

      {cropStage === "Reproductive" && type === "deadhearts" && (
        <div>
          <p>
            1. Immediate harvest or cut out affected plants to prevent further
            losses and limit the spread of pests.
          </p>
          <p>
            2. Apply recommended insecticides if pest populations are high,
            following local guidelines and safety protocols.
          </p>
        </div>
      )}

      {cropStage === "Reproductive" && type === "eggs" && (
        <div>
          <p>1. Manually remove and destroy egg masses from the leaf blades.</p>
        </div>
      )}
    </div>
  );
};
