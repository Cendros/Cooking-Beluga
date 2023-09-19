import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonModal, IonPage, IonSelect, IonSelectOption, IonText, IonTitle, IonToolbar, useIonToast } from '@ionic/react';
import React, { useRef } from 'react';
import { editRecipe, getRecipies, isExisting, saveRecipe } from '../../services/recipe';
import { arrowBack, checkmarkCircleOutline } from 'ionicons/icons';
import { Formik, FormikHelpers, Form, Field, FastFieldProps } from 'formik';
import { Recipe, RecipeForm } from '../../interfaces/repice';
import { useAtom } from 'jotai'
import { recipiesAtom, selectedRecipeAtom } from '../../atoms/recipe';
import { useTranslation } from 'react-i18next';

type NewRecipeProps = {
    recipe: Recipe | undefined,
    dismiss: () => void;
}

const NewRecipe = ({ recipe, dismiss }: NewRecipeProps) => {
    const [_, setSelectedRecipe] = useAtom(selectedRecipeAtom);
    const [recipies, setRecipies] = useAtom(recipiesAtom);

    const { t } = useTranslation();

    const [presentToast] = useIonToast();

    const showToast = (message: string) => {
        presentToast({
            message: message,
            duration: 3000,
            position: 'bottom',
        });
    }

    const modal = useRef<HTMLIonModalElement>(null);

    const initialValues: any = {
        name: recipe?.name || '',
        quantity: recipe?.quantity || null,
        quantityType: recipe?.quantityType || null,
        category: recipe?.category || null,
    }
    
    const onSubmit = async (values: RecipeForm, { setSubmitting }: FormikHelpers<RecipeForm>) => {
        setSubmitting(false);
        let _recipies;
        if (recipe && recipies) {
            await editRecipe(values, recipe.id);
            _recipies = [...recipies];
            const index = _recipies.findIndex(r => r.id = recipe.id);
            _recipies[index] = {..._recipies[index], ...values};
            setSelectedRecipe(_recipies[index]);
            showToast(t('recipe.updated'));
        } else {
            await saveRecipe(values);
            _recipies = await getRecipies();
            showToast(t('recipe.saved'));
        }
        setRecipies(_recipies);
        dismiss();
    }

    const validate = async (values: RecipeForm) => {
        const errors: any = {};
        if (!!!values.name)
            errors.name = t('recipe.form.nameRequired');
        else if (await isExisting(values.name, recipe?.id))
            errors.name = t('recipe.form.exists');
        
        if (values.quantity && values.quantity < 0)
            errors.quantity = t('recipe.form.quantityPositive.');
                
        return errors;
    }

    return (
        <IonPage ref={modal}>
            <IonContent className="ion-padding">
                <div className='flex flex-row align-items-center'>
                    <IonButton fill='clear' onClick={dismiss}>
                        <IonIcon size='large' icon={arrowBack} />
                    </IonButton>
                    <IonText color='primary'><h1 className='m-0'>{t('recipe.newRecipe')}</h1></IonText>
                </div>
                <Formik initialValues={initialValues} validate={validate} onSubmit={onSubmit} validateOnChange={false} validateOnBlur={false} validateOnMount={false}>
                        <Form className='flex flex-column gap-3 mt-3'>
                            <Field name="name" component>
                                {({ field, form: {errors}}: FastFieldProps) => (
                                    <IonInput
                                        label={t('recipe.form.name')}
                                        name={field.name}
                                        value={field.value}
                                        onIonChange={field.onChange}
                                        onIonBlur={field.onBlur}
                                        labelPlacement='floating'
                                        placeholder={t('recipe.form.namePlaceholder')}
                                        fill='outline'
                                        className={errors.name ? 'ion-invalid ion-touched mb-2' : 'mb-2'}
                                        errorText={String(errors.name || '')}
                                    />
                                )}
                            </Field>
                            <Field name="quantity" component>
                                {({ field, form: {errors}}: FastFieldProps) => (
                                    <IonInput
                                        label={t('recipe.form.quantity')}
                                        type='number'
                                        min={0}
                                        name={field.name}
                                        value={field.value}
                                        onIonChange={field.onChange}
                                        onIonBlur={field.onBlur}
                                        labelPlacement='floating'
                                        placeholder={t('recipe.form.quantity')}
                                        fill='outline'
                                        className={errors.quantity ? 'ion-invalid ion-touched mb-2' : 'mb-2'}
                                        errorText={String(errors.quantity || '')}
                                    />
                                )}
                            </Field>
                            <Field name="quantityType" component>
                                {({ field, form: {errors}}: FastFieldProps) => (
                                    <IonInput
                                        label={t('recipe.form.quantityType')}
                                        name={field.name}
                                        value={field.value}
                                        onIonChange={field.onChange}
                                        onIonBlur={field.onBlur}
                                        labelPlacement='floating'
                                        placeholder={t('recipe.form.quantityType')}
                                        fill='outline'
                                        className={errors.quantityType ? 'ion-invalid ion-touched mb-2' : 'mb-2'}
                                        errorText={String(errors.quantityType || '')}
                                    />
                                )}
                            </Field>

                            <Field name="category" component>
                                {({ field }: FastFieldProps) => (
                                    <IonSelect
                                        label={t('recipe.form.category')}
                                        name={field.name}
                                        value={field.value}
                                        onIonChange={field.onChange}
                                        onIonBlur={field.onBlur}
                                        labelPlacement='floating'
                                        placeholder={t('recipe.form.category')}
                                        fill='outline'
                                    >
                                        <IonSelectOption value="breakfast">{t('recipe.category.breakfast')}</IonSelectOption>
                                        <IonSelectOption value="lightMeal">{t('recipe.category.lightMeal')}</IonSelectOption>
                                        <IonSelectOption value="mains">{t('recipe.category.mains')}</IonSelectOption>
                                        <IonSelectOption value="desert">{t('recipe.category.desert')}</IonSelectOption>
                                    </IonSelect>
                                )}
                            </Field>
                            
                        <div className='flex justify-content-end'>
                            <IonButton fill='clear' color={'danger'} onClick={dismiss}>{t('cancel')}</IonButton>
                            <IonButton fill='clear' color={'success'} type='submit'>{t('save')}</IonButton>
                        </div>
                    </Form>
                </Formik>
            </IonContent>
        </IonPage>
    );
};

export default NewRecipe;