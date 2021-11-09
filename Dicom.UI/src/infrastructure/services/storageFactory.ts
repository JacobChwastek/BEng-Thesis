export const storageFactory = (getStorage: () => Storage): Storage => {
    let inMemoryStorage: { [key: string]: string } = {};

    const isSupported = () => {
        try {
            const testKey = "test_key";
            getStorage().setItem(testKey, testKey);
            getStorage().removeItem(testKey);
            return true;
        } catch (e) {
            return false;
        }
    };

    const clear = (): void => {
        if (isSupported()) {
            getStorage().clear();
        } else {
            inMemoryStorage = {};
        }
    };

    const getItem = (name: string): string | null => {
        if (isSupported()) {
            return getStorage().getItem(name);
        }
        if (inMemoryStorage.hasOwnProperty(name)) {
            return inMemoryStorage[name];
        }
        return null;
    };

    const key = (index: number): string | null => {
        if (isSupported()) {
            return getStorage().key(index);
        } else {
            return Object.keys(inMemoryStorage)[index] || null;
        }
    };

    const removeItem = (name: string): void => {
        if (isSupported()) {
            getStorage().removeItem(name);
        } else {
            delete inMemoryStorage[name];
        }
    };

    const setItem = (name: string, value: string): void => {
        if (isSupported()) {
            getStorage().setItem(name, value);
        } else {
            inMemoryStorage[name] = String(value); // not everyone uses TypeScript
        }
    };

    const length = (): number => {
        if (isSupported()) {
            return getStorage().length;
        } else {
            return Object.keys(inMemoryStorage).length;
        }
    };

    return {
        getItem,
        setItem,
        removeItem,
        clear,
        key,
        get length() {
            return length();
        },
    };
};
