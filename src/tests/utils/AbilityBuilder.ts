import Ability from "../../classes/Ability";

class AbilityBuilder {
    private name: string;
    private description: string;

    default(): Ability {
        return new AbilityBuilder().build()
    }

    build(): Ability {
        return new Ability(this.name, this.description);
    }

    withName(name: string): AbilityBuilder {
        this.name = name;
        return this;
    }

    withDescription(description: string): AbilityBuilder {
        this.description = description;
        return this;
    }
}

export default AbilityBuilder;