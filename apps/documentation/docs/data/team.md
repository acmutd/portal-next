---
sidebar_position: 3
---

# Teams

Information about teams populates the **Programs** tab on the Leadership site. 

### Schema

The following information about teams is stored.

```ts
interface team {
  id: string;
  name: string;
  
  accolades?: string[] | accolade[];
  participants?: participant[];
  officer?: officer;
  director?: officer[];
  tags?: string[];
}
```

:::tip
The `id` field for each team can be seen when accessing their profile page as follows --> `https://leadership.acmutd.co/team/<ID>`. This is a uniquely auto-generated id that also serves as the document name in the `teams` collection on firestore.
:::

### Participants

The participants array contains an array of participants. For each participant only the `id` and `name` fields are saved. The `name` field is used by the leadership site to display the list of participants in a team. The `id` field is only used by the GraphQL API to access all the participant's properties.

### Accolades

:::warning
The accolades feature for teams is currently **disabled**. This is because members have not been briefed on the existance of a such a feature. Additionally, setting up the integration & environment variables with the respective Projects, Research, and TIP slack workspaces is not complete. Furthermore, the accolades feature for teams involves fetching the participant emails from their `id` which is not currently implemented.
:::

Accolades for teams works in the same way as officers. See [Officer Accolades](./officer) for more information.

### Officer & Director

Each team document contains an `officer` and `director[]` field. Much like the participants array, only the `id` and `name` fields are saved. The `name` field for the officer is displayed on the leadership site. The `id` field for both officers and directors is only used by the GraphQL API to access all the officer's properties. The director field is saved as an array since some divisions like Projects have multiple directors. 

The director information is not currently displayed anywhere on the leadership site.

### Tags

The tags array contains the list of all permutations for each semester and each program that a member participated in. For example if the team was part of ACM Projects in Fall 2021 then the tags array would be as follows:

```ts
{
  participation: ["Projects F21", "Projects", "F21"],
}
```

The information in this array is used by the filter functionality on the programs tab. This filter allows for searching for the all teams (across all semesters) for a given division, all teams (across all divisions) that were run in a given semester or for all teams for a given division in a specific semester.

### Aggregations

To avoid having to read all documents when populating the programs tab of the leadership site, some information is aggregated into a single document. The following information is stored in the `total/teams` document. 

```ts
interface totalTeams {
    teams: participant[];
    programs: string[];
}
```

:::caution
Only the **required** fields from the participant interface is used to populate the aggregation document. This reduces the size of the document and ensures that only the information required is loaded up.
:::

To accomodate for reading only the aggregation document vs reading all the profile information about an officer, the `team` interface only requires the `id` and `name` fields. The full `team` interface with all fields is read back when loading up the profile page. The programs tab is the list of all permutations of programs and semesters (the union of all the `tags` fields in the individal team documents). 