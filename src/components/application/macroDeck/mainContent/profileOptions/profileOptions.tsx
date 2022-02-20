import * as React from "react";
import PageSelect from "./pageSelect";
import { useAppData } from "../../../../../hooks";
import * as Styled from "./profileOptions.styles";
import ProfileProperties from "./profileProperties";

export interface IntOptionHeaderProps {}

const OptionHeader: React.FC<IntOptionHeaderProps> = () => {
  const { appState } = useAppData();
  const profileId = appState?.active?.profileId;

  if (!profileId) {
    return <div data-testid="profile_options__not-loaded" />;
  }

  return (
    <>
      <Styled.PageHeaderWrapper data-testid="profile_options__page-header-wrapper">
        <Styled.PageHeader>
          <ProfileProperties profileId={profileId} />
          <PageSelect />
        </Styled.PageHeader>
        <Styled.PageTabs>
          <Styled.PageTab>Settings</Styled.PageTab>
        </Styled.PageTabs>
      </Styled.PageHeaderWrapper>
    </>
  );
};

export default OptionHeader;
