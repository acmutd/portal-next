---
sidebar_position: 2
---

# Members

Information about members populates the **Membership** tab on the Leadership site. 

### Schema

The following information about members is stored.

```ts
interface participant {
  id: string;
  name: string;

  email?: string[];
  netid?: string;
  classification?: string;
  major?: string;
  participation?: string[];
  accolades?: string[] | accolade[];
  teams?: team[];
}
```

:::tip
The `id` field for each member can be seen when accessing their personal page as follows --> `https://leadership.acmutd.co/participant/<ID>`. This is a uniquely auto-generated id that also serves as the document name in the `participants` collection on firestore.
:::

The `email` field in the participant document is saved as a `string[]` because we store all the different emails that students have submitted in their applications. This includes both personal emails, utd emails and other emails that they may own.

### Participation

The participation array contains the list of all permutations for each semester and each program that a member participated in. For example if a member was involved in ACM Research Fall 2020 and TIP Spring 2021, then the participation array would be as follows:

```ts
{
  participation: ["Research F20", "TIP S21", "Research", "TIP"],
}
```

The information in this array is used by the filter functionality on the membership tab. This filter allows for searching for the participants that were either involved in a specific program in a given semester or for all the participants that ever participated in a given program.

### Accolades

:::warning
The accolades feature for members is currently **disabled**. Although the functionality is complete, members have not been briefed on the existance of a such a feature. Additionally, setting up the integration & environment variables with the respective Projects, Research, and TIP slack workspaces is not complete.
:::

Accolades for participants works in the same way as officers. See [Officer Accolades](./officer) for more information.

### Teams

Each officer contains a `team[]` field. Each team object only contains the required fields from the [team interface](./participant). This field is only used by the GraphQL API.

### Aggregations

To avoid having to read all documents when populating the membership tab for the leadership site, some information is aggregated into a single document. The following information is stored in the `total/participants` document. 

```ts
interface totalParticipants {
    participants: participant[];
    programs: string[];
}
```

:::caution
Only the **required** fields from the participant interface is used to populate the aggregation document. This reduces the size of the document and ensures that only the information required is loaded up.
:::

To accomodate for reading only the aggregation document vs reading all the profile information about an officer, the `participant` interface only requires the `id` and `name` fields. The full `participant` interface with all fields is read back when loading up the profile page. The programs tab is the list of all permutations of programs and semesters (the union of all the `participation` fields in the individal member documents). 