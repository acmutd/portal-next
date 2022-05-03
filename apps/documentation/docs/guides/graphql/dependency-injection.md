---
sidebar_position: 2
---

# Dependency Injection

Dependency Injection is a design pattern in which an object receives objects that it needs from a container instead of having to manually create those in its constructor. Refer to [Wikipedia](https://en.wikipedia.org/wiki/Dependency_injection) for more details of what dependency injection is.

## Brief Description of Dependency Injection

Consider the following example that uses Dependency Injection in the following GraphQL resolver class:

```ts
@Resolver(() => SignedURL)
@injectable()
export default class SignedURLResolver {
  constructor(private signedURLService: SignedURLService) {}

  @Mutation(() => SignedURL)
  async transferFile(
    @Arg('options', () => SignedURLInput) options: SignedURLInput
    // @Ctx() context: any,
  ) {
    // const session = (await getSession(context)) as any;
    const url = await this.signedURLService.generateV4SignedUrl(options, session?.id);
    return {
      action: options.action,
      fileType: options.fileType,
      url,
    };
  }
}
```

The following is the logic within the `SignedURLService` class:

```ts
@singleton()
export default class SignedURLService {
  async generateV4SignedUrl(options: SignedURLInput, id: string) {
    if (options.fileType === FileCategory.RESUME) {
      const url = await this.generateResumeSignedUrl(options, id);
      return url;
    }
    return null;
  }

  async generateResumeSignedUrl(options: SignedURLInput, id: string) {
    const bucketName = 'acm-core.appspot.com';
    const fileName = `resumes/${id}`;

    let signedUrlOptions: GetSignedUrlConfig;

    if (options.action === Action.DOWNLOAD) {
      signedUrlOptions = {
        version: 'v4',
        action: 'read',
        expires: Date.now() + 15 * 60 * 1000, // 15 minutes
      };
    } else if (options.action === Action.UPLOAD) {
      signedUrlOptions = {
        version: 'v4',
        action: 'write',
        expires: Date.now() + 15 * 60 * 1000, // 15 minutes
      };
    } else if (options.action === Action.DELETE) {
      signedUrlOptions = {
        version: 'v4',
        action: 'delete',
        expires: Date.now() + 15 * 60 * 1000, // 15 minutes
      };
    } else {
      return null;
    }

    const [url] = await googleCloudStorage
      .bucket(bucketName)
      .file(fileName)
      .getSignedUrl(signedUrlOptions);

    return url;
  }
}
```

In the above example example, we can see that the `SignedURLResolver` class has a `SignedURLService` object as its dependency, yet a `SignedURLService` object is never created anywhere within the `SignedURLResolver` class. This is because at runtime, TSyringe will create an instance of all registered class and store all those instances within a container. As each registered class is created, TSyringe will determine all the dependency classes that the current class need, and then "inject" into that class with corresponding instances that are already in stored inside the container.

## How to do Dependency Injection with TSyringe

To register a class into TSyringe container, add `@singleton()` decorator on top of class header. The following is example usage:

```ts
@singleton()
export default class SignedURLResolver {
```

To specify TSyringe that a class needs its dependency injected, we will need to add `@injectable()` on top of class header. The following is an example usage:

```ts
@injectable()
export default class SignedURLResolver {
```

:::note
To use both `@singleton()` and `@injectable()`, one can stack decorators on top of another and the order of the decorator does not matter. Refer to the the following example for more details:

```ts
@injectable()
@singleton()
export default class SignedURLResolver {
```

:::

To specify the necessary dependencies for a class, one can do so in the class' constructor.

Consider the following example of class `A`, which has an object of class `B`, `C`, and `D` as its dependency:

```ts
@injectable()
@singleton()
export default class A {
  constructor(private bObj: B, private cObj: C, private dObj: D) {}
}
```

In this example, we specified in the constructor of class `A` that `B`, `C`, and `D` are `A`'s dependency. Upon seeing the constructor, TSyringe will automatically provide `A` with instances of specified class through the `@injectable()` decorator.

To use an dependency, say `bObj`, one can do the following:

```ts
this.bObj.doSomething();
```

## Additional Materials

To explore further how TSyringe works and what it has to offer, check out [this repo](https://github.com/microsoft/tsyringe).
