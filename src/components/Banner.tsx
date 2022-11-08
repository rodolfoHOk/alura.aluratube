import styled from 'styled-components';

const StyledBanner = styled.img`
  width: 100%;
  height: 230px;
  object-fit: cover;
`;

interface BannerProps {
  url: string;
}

export function Banner({ url }: BannerProps) {
  return <StyledBanner src={url} alt="Header banner" />;
}
