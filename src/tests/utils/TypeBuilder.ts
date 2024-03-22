import Type from '../../classes/Type';

class TypeBuilder {
    private name: string;

    default(): Type {
        return new TypeBuilder().build()
    }

    build(): Type {
        return new Type(this.name);
    }

    withName(name: string): TypeBuilder {
        this.name = name;
        return this;
    }
}

export default TypeBuilder;