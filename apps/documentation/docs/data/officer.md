---
sidebar_position: 1
---

# Officers

Information about officers populates the **Leadership** tab on the Leadership site. 

### Schema

The following information about officers is stored.

```ts
interface officer {
  id: string;
  name: string;

  email?: string;
  start?: firestore.Timestamp | string;
  end?: firestore.Timestamp | string;
  acm_email?: string;
  linkedin?: string;
  role_list?: role[] | string[];
  accolades?: accolade[] | string[];
}
```

:::tip
The `id` field for each officer can be seen when accessing their personal page as follows --> `https://leadership.acmutd.co/profile/<ID>`. This is a uniquely auto-generated id that also serves as the document name in the `officers` collection on firestore.
:::

Note: The `start` and `end` fields on the document are stored as timestamps in Firestore but are converted to and used as a `string` in the application logic.

### Roles

Each officer object contains a list of roles. The title for each role is stored as a `string[]` in the root level Firestore document. However, there is additional metadata associated with each role that is stored in own document in the `roles` subcollection. The following information about roles is stored.

```ts
interface role {
  id?: string;
  title: string;
  start?: firestore.Timestamp | string;
  end?: firestore.Timestamp | string;
}
```

The information present in the `roles` subcollection is only accessed via the GraphQL API. The leadership site only uses the `string[]` roles stored in the root level document.

### Accolades

Each officer object contains a list of accolades. The raw text for each accolade is stored as a `string[]` in the root level Firestore document. However, there is additional metadata associated with each accolade that is stored in own document in the `accolades` subcollection. The following information about accolades is stored.

```ts
interface accolade {
  id?: string;
  text: string;
  date?: firestore.Timestamp | string;
  sender_email?: string;
  sender_name?: string;
}
```

The information present in the `accolades` subcollection is only accessed via the GraphQL API. The leadership site only uses the `string[]` accolade raw text stored in the root level document.

### Aggregations

To avoid having to read all documents when populating the landing page for the leadership site, some information is aggregated into a single document. The following information is stored in the `total/allinone` document. 

```ts
interface allinone {
    officers: officer[];
    role_list: role[];
    historian: string[];
}
```

:::caution
Only the **required** fields from the aforementioned interfaces are used to populate the aggregation document. This reduces the size of the document and ensures that only the information required is loaded up.
:::

To accomodate for reading only the aggregation document vs reading all the profile information about an officer, the `officer` interface only requires the `id` and `name` fields. The full `officer` interface with all fields is read back when loading up the profile page. 

### Image

Officer headshots are stored in Firebase Cloud Storage in the `acm-core` bucket. The images are stored at `leadership/profile/<ID>.jpg` where `<ID>` is the same as the `id` field in the `officer` interface.