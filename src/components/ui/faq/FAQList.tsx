import React from 'react';

type Props = {
  text: string;
};

function FaqList({ text }: Props) {
  return <li>· {text}</li>;
}

export default FaqList;
