import Terria from "../Models/Terria";
import { BaseModel } from "../Models/Model";
import getDereferencedIfExists from "./getDereferencedIfExists";
import getAncestors from "../Models/getAncestors";
import CatalogMemberMixin from "../ModelMixins/CatalogMemberMixin";

function logDatasetAnalyticsEvent(
  terria: Terria,
  dataset: BaseModel,
  action: string,
  ...params: any[]
) {
  const dereferenced = getDereferencedIfExists(dataset);
  const path = [
    ...getAncestors(terria, dereferenced).map(getDereferencedIfExists),
    dereferenced
  ]
    .map(
      item =>
        (CatalogMemberMixin.isMixedInto(item) && item.nameInCatalog) ||
        item.uniqueId
    )
    .join("/");

  terria.analytics?.logEvent("dataSource", action, path, ...params);
}

export default logDatasetAnalyticsEvent;
