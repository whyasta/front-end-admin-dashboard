// Third-party Imports
import styled from '@emotion/styled'

// Type Imports
import type { VerticalNavProps } from '../../components/vertical-menu/VerticalNav'

type StyledVerticalNavBgColorContainerProps = Pick<VerticalNavProps, 'backgroundColor'>

// const customBackgroundColor = '#061F5C';

/**
 * backgroundColor: '#061F5C',
    backgroundImage: `url('/images/svg/register-pattern.svg')`,
    backgroundPosition: 'bottom',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat'
 */

const StyledVerticalNavBgColorContainer = styled.div<StyledVerticalNavBgColorContainerProps>`
    position: relative;
    block-size: 100%;
    z-index: 3;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    overflow-x: hidden;
    ${({ backgroundColor }) => backgroundColor && `background-color:${backgroundColor};`}
  `

export default StyledVerticalNavBgColorContainer
