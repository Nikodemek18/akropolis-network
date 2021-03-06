import * as React from 'react';

import { MarkAs } from '_helpers';
import { tKeys as tKeysAll, useTranslate, ITranslateKey } from 'services/i18n';
import { useDaoApi } from 'services/daoApi';
import { isRequired, onEnglishPlease, composeValidators, useValidateRequestAmount } from 'shared/validators';
import { Request } from 'shared/view/elements/Icons';
import { RequestForm } from 'shared/view/components';
import { TextInputField, NumberInputField } from 'shared/view/form';
import { makeAsyncSubmit } from 'shared/helpers/makeAsyncSubmit';

import { IRequestFormData } from '../../../namespace';
import { StylesProps, provideStyles } from './RequestWithdrawForm.style';

const fieldNames: { [key in keyof IRequestFormData]: key } = {
  reason: 'reason',
  amount: 'amount',
};

const tKeys = tKeysAll.features.requestWithdraw;

interface IOwnProps {
  onSuccess(): void;
  onError(error: string): void;
  onCancel(): void;
}

type IProps = IOwnProps & StylesProps;

function RequestWithdrawForm(props: IProps) {
  const { onSuccess, onError, onCancel, classes } = props;
  const { t } = useTranslate();
  const daoApi = useDaoApi();

  const validateRequestAmount = useValidateRequestAmount(daoApi);

  const validateForm = React.useCallback(({ amount, reason }: IRequestFormData):
    Partial<MarkAs<ITranslateKey, IRequestFormData>> => {
    return {
      amount: composeValidators<number>(isRequired, validateRequestAmount)(amount),
      reason: composeValidators<string>(isRequired, onEnglishPlease)(reason),
    };
  }, [validateRequestAmount]);

  const asyncSubmit = makeAsyncSubmit<IRequestFormData>(
    ({ amount, reason }) => daoApi.requestWithdraw(amount, reason),
    onSuccess,
    onError,
  );

  // tslint:disable:jsx-key
  const formFields = [
    (
      <NumberInputField
        suffix=" DAI"
        name={fieldNames.amount}
        label={t(tKeys.fields.amount.getKey())}
        fullWidth
      />),
    (
      <TextInputField
        name={fieldNames.reason}
        label={t(tKeys.fields.reason.getKey())}
        fullWidth
      />),
  ];
  // tslint:enable:jsx-key

  return (
    <RequestForm
      onCancel={onCancel}
      onSubmit={asyncSubmit}
      cancelButton={t(tKeys.form.cancel.getKey())}
      validate={validateForm}
      submitButton={<>
        <Request className={classes.buttonIcon} />
        {t(tKeys.form.submit.getKey())}
      </>}
      fields={formFields}
    />
  );
}

export default provideStyles(RequestWithdrawForm);
