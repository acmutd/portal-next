---
sidebar_position: 4
---

# Caching

All three tabs (leadership, membership and programs) support caching for their filtering functionality. Since the [aggregation document](./officer) doesn't contain additional information like roles, programs or tags (only has `id` and `name`), it is not possible to filter the data on the client side. To filter results based on role or tag, all the documents in each collection respectively needs to be fetched and then filtered. This is a very expensive read operation since these collections have hundreds of documents.

To optimize this, on the first occurence that a filter action is performed, all the documents are read back and filtered server side. Then the results of that filter operation are saved into the `total/<allinone | participant | team>/rolequery` subcollection. For the cached results, only the `id` and `name` of the documents are saved along with the `query` that was used to filter the data. Here's an example of a `rolequery` document.

```ts
{
  officer: officer[],
  query: string,
}
```

On subsequent filter actions, the cached results are checked first. If the cached results are found, the filter operation is skipped and the cached results are returned.

:::warning
These cached results do NOT expire. If new documents (new officers, participants, teams, etc) are added to the database, the cached results will be outdated. Currently, these cached results will need to be manually purged by deleting the documents in the `total/<allinone | participant | team>/rolequery` subcollection.
:::