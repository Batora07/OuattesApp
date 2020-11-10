import styled, {css} from 'styled-components';

const StyledAvatar = styled.div`
    width: 4rem;
    heigth: 4rem;
    border-radius: 2rem;
    position: relative;
    overflow: hidden;
    background: ${({ theme }) => theme.avatar.color.background};
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    ${props => props.large && css`
        width: 4.9 rem;
        height: 4.9 rem;
        border-radius: 2.45rem;
    `}

    ${props => props.big && css`
        width: 20 rem;
        height: 20 rem;
        border-radius: 50%;
    `}

    .avatar--img {
        width: 100%;
        heigth: 100%;
    }
`

export default StyledAvatar;