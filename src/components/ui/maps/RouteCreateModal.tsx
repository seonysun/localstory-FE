'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { routeOption } from '@/api/options/routeOption';
import Modal from '@/components/ui/common/modals/Modal';
import {
  modalText,
  routeModalLabel,
  routeModalP,
} from '@/components/ui/common/modals/modal.recipe';
import { useModalStore } from '@/store/useModalStore';
import { PostRoutePayload } from '@/types/route';

import { css } from '@root/styled-system/css';

function RouteCreateModal() {
  const { open, close } = useModalStore();

  const [form, setForm] = useState({
    name: '',
    description: '',
    isPublic: true,
  });

  const postMutation = useMutation({
    ...routeOption.postRoute(),
    onSuccess: res => {
      close();
      setTimeout(() => {
        open(null, res, 2);
      }, 0);
      toast.success('루트가 정상적으로 생성되었습니다.');
    },
    onError: () => {
      toast.error('루트 생성에 실패했습니다!');
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { target } = e;
    const { name, value, type } = target;

    const newValue =
      type === 'checkbox' ? (target as HTMLInputElement).checked : value;

    setForm(prev => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const onSubmit = () => {
    const payload: PostRoutePayload = {
      ...form,
    };
    postMutation.mutate(payload);
  };

  return (
    <Modal className={css({ height: '300px' })} onConfirm={onSubmit}>
      <p className={modalText({ text: 'pageTitle' })}>나만의 루트 만들기</p>
      <label htmlFor="routeName" className={routeModalLabel()}>
        <p className={routeModalP()}>루트 이름</p>
        <input
          id="routeName"
          name="name"
          placeholder="생성할 루트명 입력"
          value={form.name}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="routeDes" className={routeModalLabel()}>
        <p className={routeModalP()}>설명</p>
        <textarea
          id="routeDes"
          name="description"
          placeholder="루트에 대한 설명을 입력하세요"
          value={form.description}
          onChange={handleChange}
          rows={3}
        />
      </label>
      <label htmlFor="routePublic" className={routeModalLabel({ mb: 'sm' })}>
        <input
          id="routePublic"
          type="checkbox"
          name="isPublic"
          checked={form.isPublic}
          onChange={handleChange}
        />
        <span className={routeModalP({ ml: 'sm' })}>공개 여부</span>
      </label>
    </Modal>
  );
}

export default RouteCreateModal;
