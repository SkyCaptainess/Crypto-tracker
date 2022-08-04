import React from 'react';
import styled from "styled-components";
import Spinner from './img/spinner.gif';

const LoaderBlock = styled.span`
  text-align: center;
  display: block;
  margin-top: 50px;
  img{
    width: 120px;
    height: 120px;
  }
`;

const Loader = () => {
    return (
        <LoaderBlock><img src={Spinner} alt='Loading..' width='5%' /></LoaderBlock>
    );
};

export default Loader;