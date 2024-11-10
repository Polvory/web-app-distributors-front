import styled from "styled-components";

const StyledContentWrapper = styled.div`
  row-gap: 1rem;
  padding: 1rem 1rem 6rem 1rem;
  display: flex;
  flex-direction: column;
`;

// Компонента-обертка
const ContentWrapper = ({ children }) => {
  return <StyledContentWrapper>{children}</StyledContentWrapper>;
};

export default ContentWrapper;
